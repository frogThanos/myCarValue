import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
    console.log('createUser body: ', body);
  }

  // Nestjs does not automatically pars strings into numbers
  // we need to do that ourselves
  @Get('/:id')
  findUser(@Param('id') id: string) {
    const parsId = parseInt(id);
    return this.usersService.findOne(parsId);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const parsId = parseInt(id);
    return this.usersService.update(parsId, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    const parsId = parseInt(id);
    return this.usersService.remove(parsId);
  }
}
