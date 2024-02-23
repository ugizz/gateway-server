import { ApiProperty } from "@nestjs/swagger";


export class FriendRequestListDto {
  @ApiProperty({
    example: 1,
    description: '친구신청 고유 식별 번호',
  })
  friend_request_id: number;

  @ApiProperty({
    example: 'nickname',
    description: '사용자 닉네임',
  })
  friend_nickname: string;

  @ApiProperty({
    example: 1,
    description: '친구 고유 식별 번호',
  })
  is_friend: boolean;

  @ApiProperty({
    description: '친구신청한 날짜 및 시간',
  })
  created_at: Date;

  @ApiProperty({
    example: false,
    description: '친구신청받은 사용자가 읽었는지 여부',
  })
  is_read: boolean;
} 