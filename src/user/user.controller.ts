import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.model';
import { Public } from 'src/decorators';

export type PromisedUser = Promise<User | null>;
export type PromisedUserArray = Promise<User[]>;

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Public()
  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): PromisedUser {
    return await this._userService.addUser(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): PromisedUser {
    return this._userService.findOne(email);
  }

  @Get()
  async getAllUsers(): PromisedUserArray {
    return this._userService.findAll();
  }

  @Delete()
  async wipeUserData() {
    await this._userService.obliterate();
  }
}
