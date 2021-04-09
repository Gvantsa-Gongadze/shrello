import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';
import { sendEmail } from '../utils/SendEmail';
import { createConfirmationUrl } from '../utils/CreateConfirmationUrl';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    @Post()
    async signUp(@Body() userDto: CreateUserDto) {
        const regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

        if(!userDto.password || !userDto.email) {
            throw new Error('Enter Username and password for registration.');
        }
        if(userDto.password.length < 6) {
            throw new Error('Password must be at least 8 characters long.');
        }
        if(!regex.test(userDto.email)) {
            throw new Error('Invalid email. Please try a different one.');
        }

        const emailExists = await this.userModel.findOne({email: userDto.email});
        if(emailExists) {
            throw new Error('Email already exists. Please try a different one.');
        }

        const user = await this.usersService.createUser(userDto);
        if(!user) {
            throw new Error('Something went wrong. Try again.');
        }

        const url = createConfirmationUrl(user['_id']);
        await sendEmail(user.email, url);

        delete user.password;
        return user;
    }

    @Put()
    async signIn(@Body() userDto: LoginUserDto) {
        if(!userDto.password || !userDto.email) {
            throw new Error('Enter Username and password to login.');
        }

        const emailExists = await this.userModel.findOne({email: userDto.email});
        if(!emailExists) {
            throw new Error('Email does not exist. Please try again.');
        }
        const user = await this.usersService.signIn(userDto)
        delete user.password;
        return user;
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param() params: {id: string | number} ){
        return this.usersService.findById(params.id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        return this.usersService.updateById(id, createUserDto);
    }
}