import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    this.init();
  }

  private async init() {
    await this.userModel.sync();
  }

  async addUser(uemail: string, upassword: string): Promise<User> {
    const hashed = await bcrypt.hash(upassword, 10);
    return this.userModel.create({ email: uemail, password: hashed });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(uemail: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email: uemail,
      },
    });
  }

  async obliterate() {
    await this.userModel.destroy({ where: {} });
  }

  async remove(uemail: string): Promise<void> {
    const user = await this.findOne(uemail);
    if (user) await user.destroy();
  }
}
