import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res,Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {LoginUserDto} from "./dto/login.dto";
import {Request,Response} from 'express'

function ApiOkResponse(param: { description: string }) {
  
}

function ApiBadRequestResponse(param: { description: string }) {
  
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);

  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto,@Res({passthrough: true})response: Response) {
    const result = await this.usersService.login(loginUserDto);
    response.cookie('access_token', result.access_token,{httpOnly:true});
    return result;
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('access_token');
    return {
      message: 'Logged out successfully'
    }
  }

  @Get('user')
  findUser(@Req() request :Request) {
    return this.usersService.findUser(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
