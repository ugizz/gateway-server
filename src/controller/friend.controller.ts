import {
  Controller,
  ValidationPipe,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Patch,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ClientProxy } from '@nestjs/microservices';
import { FriendRequestDto } from 'src/data/dto/friend/reqeust/friend.request.dto';
import { FriendComplyDto } from 'src/data/dto/friend/reqeust/friend.comply.dto';
import { GetUser } from 'src/get-user.decorator';
import { User } from 'src/data/entity/user.entity';
import { lastValueFrom } from 'rxjs';
import { ResponseEntity } from 'src/data/entity/ResponseEntity';
import { FriendListDto } from 'src/data/dto/friend/response/friend.list.dto';
import { FriendRequestListDto } from 'src/data/dto/friend/response/friend.request.list.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('friend')
export class FriendController {
  constructor(
    @Inject('FRIEND')
    private readonly friendClient: ClientProxy,
  ) {}

  @Post('/request')
  async request(
    @Body(ValidationPipe) friendRequestDto: FriendRequestDto,
    @GetUser() user: User,
  ): Promise<ResponseEntity<string>> {
    friendRequestDto.user = user;
    return await lastValueFrom(
      this.friendClient.send('request', friendRequestDto),
    );
  }

  @Post('/comply')
  async comply(
    @Body(ValidationPipe) friendComplyDto: FriendComplyDto,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(
      this.friendClient.send('comply', friendComplyDto),
    );
  }

  @Get('/friend-list')
  async getFriends(
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendListDto[]>> {
    return await lastValueFrom(this.friendClient.send('getFriendsList', user));
  }

  @Get('/requested-list')
  async requestFriend(
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendRequestListDto[]>> {
    return await lastValueFrom(this.friendClient.send('requestFriend', user));
  }

  @Get('/received-list')
  async receviedFriend(
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendRequestListDto[]>> {
    return await lastValueFrom(this.friendClient.send('receviedFriend', user));
  }

  @Patch('/requested/:requestId')
  async delete(
    @Param('requestId') friendRequestId: number,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(
      this.friendClient.send('receviedFriend', friendRequestId),
    );
  }
}
