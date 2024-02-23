import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginGuestDto {
  @ApiProperty({
    description: '접속한 디바이스의 고유한 시리얼 넘버',
    example: '디바이스 id',
    type: String,
  })
  @IsString()
  guestId: string;
}
