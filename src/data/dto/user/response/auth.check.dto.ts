import { ApiProperty } from '@nestjs/swagger';

export class CheckDto {
  @ApiProperty({
    description: '사용가능 true, 사용불가 false',
  })
  check: boolean;
}
