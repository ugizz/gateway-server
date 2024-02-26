import {
  Body,
  Controller,
  Get,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('게임 API')
@Controller('game')
@UseGuards(AuthGuard())
export class GameController {
  constructor(
    @Inject('GAME')
    private readonly gameClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: '게임 결과 전송' })
  @ApiBody({
    type: GameResultDto,
    description: '게스트 회원가입에 대한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseEntity,
  })
  @Post('/result')
  async create(
    @Body(ValidationPipe) gameResultDto: GameResultDto,
    @GetUser() user: User,
  ): Promise<ResponseEntity<string>> {
    gameResultDto.user = user;
    return await lastValueFrom(this.gameClient.send('create', gameResultDto));
  }

  // @ApiOperation({ summary: '게임 결과 확인' })
  // @ApiResponse({
  //   type: ResponseEntity,
  // })
  // @Get('/recode')
  // async getresult(@GetUser() user: User): Promise<ResponseEntity<string>> {
  //   gameResultDto.user = user;
  //   return await lastValueFrom(
  //     this.gameClient.send('getresult', gameResultDto),
  //   );
  // }
}
