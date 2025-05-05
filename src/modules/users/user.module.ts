import { Module } from '@nestjs/common';
import { UserConroller } from './users.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserConroller],
  providers: [UserService],
})
export class UserModule {}
