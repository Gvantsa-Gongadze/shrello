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

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const emailExists = await this.userModel.findOne({email: createUserDto.email});
        if(emailExists) {
            throw new Error('Email already exists. Please try a different one.');
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
        createUserDto.token = await bcrypt.hash(createUserDto.password, 7);
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    async findById(@Param(':id') id: number | string) {
        return await this.userModel.findById(id).exec();
    }
    async findByToken(@Param() token: number | string) {
        return await this.userModel.findOne({ token: token.toString() }).exec();
    }

    async signIn(@Param() params: LoginUserDto) {
        try {
            const user = await this.userModel.findOne({email: params.email});
            if(!user) {
                throw new Error('Email does not exist. Please try again.');
            }
            const isPasswordCorrect = await bcrypt.compare(params.password, user.password);
            if(!isPasswordCorrect) {
                throw new Error('Username / password combination is incorrect.');
            }

            user.token = await bcrypt.hash(user.password, 7);
            return user.save();
        } catch(e) {
            throw new Error('Username / password combination is incorrect.');
        }
    }

    async updateById(@Param(':id') id, updateUser: UpdateUserDto) {
        const updateUserDto = await this.findById(id);
        const updateKeys = Object.keys(updateUser);
        updateKeys.map(updateKey => {
            if(updateUserDto[updateKey] !== undefined) {
                updateUserDto[updateKey] = updateUser[updateKey]
            }
        })
        return updateUserDto.save()
    }
}