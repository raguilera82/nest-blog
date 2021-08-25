import { Injectable } from '@nestjs/common';
import { PasswordVO } from './../../../domain/model/vos/password.vo';
import { ExceptionWithCode } from '../../../domain/model/exception-with-code';
import { EmailVO } from '../../../domain/model/vos/email.vo';
import { UserService } from '../../../domain/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class SignInUseCase {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async execute(request: SignInRequest): Promise<string | null> {
    const user = await this.userService.getByEmail(
      EmailVO.create(request.email),
    );
    if (!user) {
      throw new ExceptionWithCode(404, 'User not found');
    }
    const plainPassword = PasswordVO.create(request.password);
    const isValid = await this.userService.isValidPassword(plainPassword, user);
    if (isValid) {
      const payload: JwtPayload = { email: user.email.value };
      return this.jwtService.sign(payload);
    }
    return null;
  }
}

export type SignInRequest = {
  email: string;
  password: string;
};
