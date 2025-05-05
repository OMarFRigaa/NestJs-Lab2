import { Injectable, NestMiddleware, Param } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.table({
      url: req.url,
      path: req.path,
      params: req.params,
    });
    next();
  }
}
