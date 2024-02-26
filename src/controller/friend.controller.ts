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
import {
  ResponseEntity,
  ResponseFriendListDto,
  ResponseFriendRequestListDto,
} from 'src/data/entity/ResponseEntity';
import { FriendListDto } from 'src/data/dto/friend/response/friend.list.dto';
import { FriendRequestListDto } from 'src/data/dto/friend/response/friend.request.list.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('친구 API')
@UseGuards(AuthGuard('jwt'))
@Controller('friend')
export class FriendController {
  constructor(
    @Inject('FRIEND')
    private readonly friendClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: '친구 신청' })
  @ApiBody({
    type: FriendRequestDto,
    description: '친구 신청에 대한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseEntity,
  })
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

  @ApiOperation({ summary: '친구 신청 수락' })
  @ApiBody({
    type: FriendComplyDto,
    description: '친구 신청 수락에 필요한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseEntity,
  })
  @Post('/comply')
  async comply(
    @Body(ValidationPipe) friendComplyDto: FriendComplyDto,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(
      this.friendClient.send('comply', friendComplyDto),
    );
  }

  @ApiOperation({ summary: '사용자의 친구 목록을 조회' })
  @ApiResponse({
    type: ResponseFriendListDto,
  })
  @Get('/friend-list')
  async getFriends(
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendListDto[]>> {
    return await lastValueFrom(this.friendClient.send('getFriendsList', user));
  }

  @ApiOperation({ summary: '사용자의 친구 신청 내역 조회' })
  @ApiResponse({
    type: ResponseFriendRequestListDto,
  })
  @Get('/requested-list')
  async requestFriend(
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendRequestListDto[]>> {
    return await lastValueFrom(this.friendClient.send('requestFriend', user));
  }

  @ApiOperation({ summary: '사용자의 친구 요청 받은 내역 조회' })
  @ApiResponse({
    type: ResponseFriendRequestListDto,
  })
  @Get('/received-list')
  async receviedFriend(
    @GetUser() user: User,
  ): Promise<ResponseEntity<FriendRequestListDto[]>> {
    return await lastValueFrom(this.friendClient.send('receviedFriend', user));
  }

  @ApiOperation({ summary: '친구 신청 거절' })
  @ApiParam({
    name: 'requestId',
    description: '친구 요청의 고유 번호',
  })
  @ApiResponse({
    type: ResponseEntity,
  })
  @Patch('/requested/:requestId')
  async delete(
    @Param('requestId') friendRequestId: number,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(
      this.friendClient.send('requestRejct', friendRequestId),
    );
  }
}
