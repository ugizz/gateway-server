import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GameController } from './controller/game.controller';
import { FriendController } from './controller/friend.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: {
          port: 8101,
          host: process.env.AUTHHOST || 'localhost',
        },
      },
      {
        name: 'FRIEND',
        transport: Transport.TCP,
        options: {
          port: 8102,
          host: process.env.FRIENDHOST || 'localhost',
        },
      },
      {
        name: 'GAME',
        transport: Transport.TCP,
        options: {
          port: 8103,
          host: process.env.GAMEHOST || 'localhost',
        },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, FriendController, GameController],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
