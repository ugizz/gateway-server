import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';


import { AuthGuard } from '@nestjs/passport';
import { ClientProxy } from '@nestjs/microservices';
import { GameResultDto } from 'src/data/dto/game/game.result.create.dto';
import { User } from 'src/data/entity/user.entity';
import { GetUser } from 'src/get-user.decorator';

@Controller('game')
@UseGuards(AuthGuard())
export class GameController {
  constructor(
    @Inject('GAME')
    private readonly gameClient: ClientProxy,
  ) {}

  @Post('/result')
  async create(
    @Body(ValidationPipe) gameResultDto: GameResultDto,
    @GetUser() user: User,
  ) {
    gameResultDto.user = user;
    return await this.gameClient.send('create', gameResultDto);
  }
}
