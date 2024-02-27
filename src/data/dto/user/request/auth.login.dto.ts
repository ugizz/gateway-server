import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: '사용자 로그인 아이디',
    example: 'suwon123',
    type: String,
  })
  @IsString()
  @MaxLength(50)
  id: string;

  @ApiProperty({
    description: '사용자 로그인 비밀번호',
    example: 'passwd123',
    type: String,
  })
  @IsString()
  @MaxLength(20)
  passwd: string;
}
