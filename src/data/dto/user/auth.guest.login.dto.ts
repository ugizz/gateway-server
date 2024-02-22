
import { IsString } from "class-validator";

export class AuthLoginGuestDto {
    @IsString()
    guestId: string;
}