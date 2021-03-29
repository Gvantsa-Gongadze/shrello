import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
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
        const user = users.filter(user => user._id.toString() === id)
        return user
    }

    async findOne(@Param() params) {
        if (!params.password || !params.email) {
            return null
        }

        try {
            const user = await this.userModel.findOne({email: params.email})
            const compare = await bcrypt.compare(params.password, user.password)

            if(compare) {
                return user.token
            }
        } catch(e) {
            console.log(e)
        }
    }

    async updateById(@Param(':id') id, updateUser) {
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