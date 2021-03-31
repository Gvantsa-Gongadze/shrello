import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 8)
        createUserDto.token = await bcrypt.hash(createUserDto.password, 7)
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(@Param(':id') id: number | string) {
        const users = await this.userModel.find().exec()
        return users.filter(user => user._id.toString() === id)
    }

    async login(@Param() params: LoginUserDto) {
        if (!params.password || !params.email) {
            return null
        }

        try {
            const user = await this.userModel.findOne({email: params.email})
            const isPasswordCorrect = await bcrypt.compare(params.password, user.password)
            const newToken = await bcrypt.hash(user.password, 7)

            if(isPasswordCorrect) {
                return newToken
            } else {
                throw new Error('Username / password combination is incorrect.');
            }
        } catch(e) {
            console.log(e)
        }
    }

    async updateById(@Param(':id') id, updateUser: UpdateUserDto) {
        const updateUserDto = await this.findById(id);
        const updateKeys = Object.keys(updateUser);
        updateKeys.map(updateKey => {
            if(updateUserDto[0][updateKey] !== undefined) {
                updateUserDto[0][updateKey] = updateUser[updateKey]
            }
        })
        return updateUserDto[0].save()
    }
}