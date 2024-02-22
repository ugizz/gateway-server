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
        options: { port: 8101 },
      },
      {
        name: 'FRIEND',
        transport: Transport.TCP,
        options: { port: 8102 },
      },
      {
        name: 'GAME',
        transport: Transport.TCP,
        options: { port: 8103 },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, GameController, FriendController],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AppModule {}
