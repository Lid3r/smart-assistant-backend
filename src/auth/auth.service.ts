import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ userId: number; email: string; access_token: string }> {
    const user = await this.userService.findOne(username);

    //Doesnt work with await bcrypt.compare for some reason
    if (!user || !bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    return {
      userId: user.id,
      email: user.email,
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
