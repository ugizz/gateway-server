import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: '사용자 로그인 아이디',
    example: 'suwon123',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  id: string;

  @ApiProperty({
    description: '사용자 로그인 비밀번호',
    example: 'passwd123',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '영문 숫자만 가능합니다.',
  })
  passwd: string;
}
