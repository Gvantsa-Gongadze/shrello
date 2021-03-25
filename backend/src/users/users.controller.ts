import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { sendEmail } from '../utils/SendEmail'
import { createConfirmationUrl } from '../utils/CreateConfirmationUrl'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const url = createConfirmationUrl(user['_id'])
        await sendEmail(user.email, url)
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params){
        return this.usersService.findOne(params.id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        const users = this.usersService.updateById(id, createUserDto)
        return users;
    }
}