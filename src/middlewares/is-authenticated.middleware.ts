import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
      throw new UnauthorizedException('No authorization token provided');
    }

    const token = bearerToken.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const payload = jwt.verify(
        token,
        this.configService.getOrThrow<string>('JWT_KEY'),
      );
      req['user'] = payload as IJwtPayload;
      // req.user = payload as IJwtPayload;
    } catch (err) {
      throw new UnauthorizedException();
    }
    next();
  }
}
