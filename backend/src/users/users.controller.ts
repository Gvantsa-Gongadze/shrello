import { Body, Controller, Get, Param, Post, Put, Headers, Header } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './schemas/user.schema';

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

        const user = await this.usersService.createUser(userDto);
        const { password, ...rest } = user;
        return rest;
    }

    @Put()
    async signIn(@Body() userDto: LoginUserDto) {
        if(!userDto.password || !userDto.email) {
            throw new Error('Enter Username and password to login.');
        }

        const updateUser = await this.usersService.signIn(userDto)
        const { password, ...rest } = updateUser;
        return rest;
    }

    @Get()
    async findByToken(@Headers('Token') header: string){
        if(!header) {
            return this.findAllUsers();
        }
        const user = await this.usersService.findByToken(header);

        const { password, ...rest } = user;
        return rest
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