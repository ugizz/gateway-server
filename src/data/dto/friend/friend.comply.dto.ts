
import { IsNumber } from "class-validator";

export class FriendComplyDto {
    @IsNumber()
    friendRequestId: number;
} 