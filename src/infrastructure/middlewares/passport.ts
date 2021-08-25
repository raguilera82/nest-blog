import { EmailVO } from './../../domain/model/vos/email.vo';
import { UserService } from './../../domain/services/user.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../domain/model/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getByEmail(
      EmailVO.create(payload.email),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
