import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getProfile(user: any) {
    return await this.userModel
      .findOne({ email: user.email })
      .select('username email age');
  }

  async getAllUsers(user: IJwtPayload) {
    const allUsers = await this.userModel.find({ email: { $ne: user.email } });
    const usersWithoutPassword = allUsers.map(
      ({ fullName, email, Age, phoneNumber }) => ({
        fullName,
        email,
        Age,
        phoneNumber,
      }),
    );
    return usersWithoutPassword;
  }
}
