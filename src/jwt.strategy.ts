import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import * as config from 'config';

import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './data/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH')
    private readonly authClient: ClientProxy,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userId } = payload;

    const user = await lastValueFrom(
      this.authClient.send<User>('findUserId', userId),
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
