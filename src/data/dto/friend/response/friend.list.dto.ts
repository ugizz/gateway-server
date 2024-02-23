import { ApiProperty } from '@nestjs/swagger';

export class FriendListDto {
  @ApiProperty({
    example: 1,
    description: '친구 고유 식별 번호',
  })
  id: number;

  @ApiProperty({
    description: '친구신청 수락 날짜 및 시간',
  })
  complyed_at: Date;

  @ApiProperty({
    example: 'goodsuwon',
    description: '친구인 사용자 닉네임',
  })
  friend_nickname: string;

  @ApiProperty({
    example: 1,
    description: '친구 신청 고유 식별 번호',
  })
  friend_request_id: number;
}
