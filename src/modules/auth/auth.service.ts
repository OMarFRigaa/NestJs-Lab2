import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { ConfigService } from '@nestjs/config';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import * as bcrybt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { name, password, email, age, phone } = dto;
    let user = await this.userModel.findOne({ email });

    if (user) {
      throw new ConflictException('this user already exists');
    }

    const hasedPassword = await bcrybt.hash(password, 10);

    user = await this.userModel.create({
      fullName: name,
      password: hasedPassword,
      Age: age,
      phoneNumber: phone,
      email: email,
    });

    const { password: _password, ...result } = user.toJSON();

    return result;
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPasswordCorrect = await bcrybt.compare(
      dto.password,
      user?.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('invalid credentials');
    }

    const { password: _password, email: userEmail } = user.toJSON();

    const payload: IJwtPayload = { email: user.email };
    const token = jwt.sign(
      payload,
      this.configService.getOrThrow<string>('JWT_KEY'),
    );

    return token;
  }
}
