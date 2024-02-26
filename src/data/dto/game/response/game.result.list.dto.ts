import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/data/entity/user.entity';

export class ResultListDto {
  @ApiProperty({
    example: 'seeker',
    description: '술래역할인지 숨는 역할인지',
  })
  role_name: string;

  @ApiProperty({
    example: '2024-02-25T18:27:53.000Z',
    description: '게임을 플레이한 날짜 및 시간',
  })
  played_at: Date;

  @ApiProperty({
    example: '1',
    description: '이겼는지 졌는지 구분 가능 이겼다면 1 졌다면 0',
  })
  is_win: boolean;

  @ApiProperty({
    example: 'suwon123',
    description: '플레이한 유저의 닉네임',
  })
  nickname: string;
}
