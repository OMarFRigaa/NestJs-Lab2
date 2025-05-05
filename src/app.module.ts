import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { IsAuthenticatedMiddleware } from './middlewares/is-authenticated.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      useFactory: (ConfigService: ConfigService) => {
        const uri = ConfigService.getOrThrow<string>('MONGO_DB_URI');
        return { uri };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');

    consumer
      .apply(IsAuthenticatedMiddleware)
      .exclude(
        { path: '/users/sign-up', method: RequestMethod.POST },
        { path: '/users/sign-in', method: RequestMethod.POST },
      )
      .forRoutes('/');
  }
}
