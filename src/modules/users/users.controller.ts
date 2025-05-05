import { Body, Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { Request } from 'express';

@Controller('/users')
export class UserConroller {
  constructor(private readonly service: UserService) {}

  @Get('/profile')
  getProfile(@Req() request: Request) {
    return this.service.getProfile(request['user']);
  }

  @Get('/all-users')
  getAllUsers(@Req() request: Request) {
    return this.service.getAllUsers(request['user']);
  }
}
