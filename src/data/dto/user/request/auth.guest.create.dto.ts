
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreateGuestDto {
    @IsString()
    @MinLength(4)
    @MaxLength(200) 
    @IsNotEmpty()
    guestId: string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @Matches(/^[a-zA-Z0-9가-힣]*$/, { message: '영어 숫자 한글만 가능합니다' })
    nickname: string;
}