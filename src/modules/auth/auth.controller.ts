import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('/users')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto);
  }

  @Post('/sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.service.signUp(dto);
  }
}
