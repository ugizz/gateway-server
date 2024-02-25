import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCreateDto {
  @ApiProperty({
    description:
      '로그인의 필요한 사용자 아이디 (a-zA-Z0-9)만 가능 최소 4자리 - 최대 50자리',
    example: 'suwon123',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: '영어와 숫자만 입력 가능합니다.',
  })
  id: string;

  @ApiProperty({
    description:
      '로그인의 필요한 사용자 비밀번호 영문 대소문자와 숫자, 특수문자(@, $, !, %, *, ?, &)를 포함해야 한다',
    example: 'passwd123',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{13,}$/, {
    message:
      '비밀번호는 13자 이상이어야 하며, 영문 대소문자와 숫자, 특수문자(@, $, !, %, *, ?, &)를 포함해야 합니다.',
  })
  passwd: string;

  @ApiProperty({
    description: '이메일',
    example: 'suwon@com2us.com',
    type: String,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: '이메일 형식에 맞지 않습니다.',
  })
  email: string;

  @ApiProperty({
    description: '사용자의 닉네임  (a-zA-Z0-9가-힣)만 가능',
    example: 'myNickname',
    type: String,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9가-힣]*$/, { message: '영어 숫자 한글만 가능합니다' })
  nickname: string;
}
