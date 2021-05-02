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

    async createUser(createUserDto: CreateUserDto) {
        const emailExists = await this.userModel.findOne({email: createUserDto.email});
        if(emailExists) {
            throw new Error('Email already exists. Please try a different one.');
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
        createUserDto.token = await bcrypt.hash(createUserDto.password, 7);
        const userDoc = new this.userModel(createUserDto);
        const user = await userDoc.save()
        
        return {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token,
            boards: user.boards,
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({}, {password: 0}).exec();
    }
    async findById(@Param(':id') id: number | string) {
        return await this.userModel.findById(id, {password: 0}).exec();
    }
    async findByToken(@Param() token: number | string) {
        return await this.userModel.findOne({token: token.toString()}, {password: 0}).exec();
    }

    async signIn(@Param() params: LoginUserDto) {
        try {
            const user = await this.userModel.findOne({email: params.email}).exec();
            if(!user) {
                throw new Error('Email does not exist. Please try again.');
            }
            const isPasswordCorrect = await bcrypt.compare(params.password, user.password);
            if(!isPasswordCorrect) {
                throw new Error('Username / password combination is incorrect.');
            }

            user.token = await bcrypt.hash(user.password, 7);
            user.save()
            return {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                token: user.token,
                boards: user.boards,
            }
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