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
import { FriendRequestDto } from 'src/data/dto/friend/friend.request.dto';
import { FriendComplyDto } from 'src/data/dto/friend/friend.comply.dto';
import { GetUser } from 'src/get-user.decorator';
import { User } from 'src/data/entity/user.entity';

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
  ) {
    friendRequestDto.user = user;
    return await this.friendClient.send('request', friendRequestDto);
  }

  @Post('/comply')
  async comply(@Body(ValidationPipe) friendComplyDto: FriendComplyDto) {
    return await this.friendClient.send('comply', friendComplyDto);
  }

  @Get('/friend-list')
  async getFriends(@GetUser() user: User) {
    return await this.friendClient.send('getFriendsList', user);
  }

  @Get('/requested-list')
  async requestFriend(@GetUser() user: User) {
    return await this.friendClient.send('requestFriend', user);
  }

  @Get('/received-list')
  async receviedFriend(@GetUser() user: User) {
    return await this.friendClient.send('receviedFriend', user);
  }

  @Patch('/requested/:requestId')
  async delete(@Param('requestId') friendRequestId: number) {
    return await this.friendClient.send('receviedFriend', friendRequestId);
  }
}
