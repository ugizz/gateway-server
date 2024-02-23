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
import { GameResultDto } from 'src/data/dto/game/request/game.result.create.dto';
import { User } from 'src/data/entity/user.entity';
import { GetUser } from 'src/get-user.decorator';
import { ResponseEntity } from 'src/data/entity/ResponseEntity';
import { lastValueFrom } from 'rxjs';

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
  ): Promise<ResponseEntity<string>> {
    gameResultDto.user = user;
    return await lastValueFrom(this.gameClient.send('create', gameResultDto));
  }
}
