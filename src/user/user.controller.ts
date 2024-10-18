import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async userLogin(@Body() body) {
    return this.userService.userLogin(
      body.groupId,
      body.username,
      body.password,
    );
  }

  @Post('/create')
  async userCreate(@Body() body) {
    return this.userService.createUser(
      body.groupId,
      body.name,
      body.username,
      body.password,
      body.email,
    );
  }
}
