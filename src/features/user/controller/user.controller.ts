import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/nonce')
  getNonce(@Query('publicAddress') publicAddress: string) {
    return this.userService.getNonce(publicAddress);
  }
  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.filterUser(
      await this.userService.validateUserByName(username),
    );
  }
}
