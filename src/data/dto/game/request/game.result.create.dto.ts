import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/data/entity/user.entity';

export class GameResultDto {
  @IsNumber()
  roleId: number;

  userSession: string;

  roomSession: string;

  @IsBoolean()
  isWin: boolean;

  @IsOptional()
  user: User | null;
}
