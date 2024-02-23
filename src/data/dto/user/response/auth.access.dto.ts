import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    description: '인증 토큰',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: '사용자 닉네임',
    type: String,
    example: 'nickname',
  })
  nickname: string;
}
