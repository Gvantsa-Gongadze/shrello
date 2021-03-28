import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    async findOne(@Query() query){
        if(!query.password && !query.email) {
            return await this.findAll()
        } else {
            return await this.usersService.findOne(query);
        }
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param() params){
        return this.usersService.findById(params.id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        return this.usersService.updateById(id, createUserDto)
    }
}