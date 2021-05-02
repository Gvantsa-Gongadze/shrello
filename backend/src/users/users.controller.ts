import { Body, Controller, Get, Param, Post, Put, Headers } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('users')
export class UsersController {
    regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

    constructor(
        private usersService: UsersService
    ) {}

    @Post()
    async signUp(@Body() userDto: CreateUserDto) {
        if(!userDto.password || !userDto.email) {
            throw new Error('Enter Username and password for registration.');
        }
        if(userDto.password.length < 6) {
            throw new Error('Password must be at least 8 characters long.');
        }
        if(!this.regex.test(userDto.email)) {
            throw new Error('Invalid email. Please try a different one.');
        }

        return await this.usersService.createUser(userDto);
    }

    @Put()
    async signIn(@Body() userDto: LoginUserDto) {
        if(!userDto.password || !userDto.email) {
            throw new Error('Enter Username and password to login.');
        }

        return await this.usersService.signIn(userDto);
    }

    @Get()
    async findAllUsers() {
        return await this.usersService.findAll();
    }

    @Get('token')
    async findByToken(@Headers('token') header: string){
        if(!header) {
            throw new Error('User was not found');
        }
        return await this.usersService.findByToken(header);
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