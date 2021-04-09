import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './schemas/user.schema';
import { sendEmail } from '../utils/SendEmail';
import { createConfirmationUrl } from '../utils/CreateConfirmationUrl';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put()
    async create(@Body() userDto: CreateUserDto) {
        const user = await this.usersService.create(userDto);
        const url = createConfirmationUrl(user['_id']);
        await sendEmail(user.email, url);
    }

    @Post()
    async login(@Body() userDto: LoginUserDto) {
        return await this.usersService.login(userDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
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