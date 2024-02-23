import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  ValidationPipe,
  Inject,
} from '@nestjs/common';

import { IsString, Matches } from 'class-validator';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCreateDto } from 'src/data/dto/user/request/auth.create.dto';
import { AuthLoginDto } from 'src/data/dto/user/request/auth.login.dto';
import { AuthCreateGuestDto } from 'src/data/dto/user/request/auth.guest.create.dto';
import { AuthLoginGuestDto } from 'src/data/dto/user/request/auth.guest.login.dto';
import { ResponseEntity } from 'src/data/entity/ResponseEntity';
import { Observable, lastValueFrom } from 'rxjs';
import { AccessTokenDto } from 'src/data/dto/user/response/auth.access.dto';

class NicknameParams {
  @IsString()
  @Matches(/^[a-zA-Z0-9가-힣]*$/)
  nickname: string;
}

class userIdParams {
  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/)
  id: string;
}

@Controller('user')
export class AuthController {
  constructor(
    @Inject('AUTH')
    private readonly authClient: ClientProxy,
  ) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCreateDto: AuthCreateDto,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(this.authClient.send('signUp', authCreateDto));
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return await lastValueFrom(this.authClient.send('signIn', authLoginDto));
  }

  @Post('signup/guest')
  async guestSignUp(
    @Body(ValidationPipe) authCreateGuestDto: AuthCreateGuestDto,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(
      this.authClient.send('guestSignUp', authCreateGuestDto),
    );
  }

  @Post('signin/guest')
  async guestSignIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginGuestDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return lastValueFrom(await this.authClient.send('signIn', authLoginDto));
  }

  @Get('userid/:id/duplicate')
  async checkUsername(
    @Param(ValidationPipe) param: userIdParams,
  ): Promise<ResponseEntity<string>> {
    return lastValueFrom(await this.authClient.send('checkAddress', param.id));
  }

  @Get('nickname/:nickname/duplicate')
  async checkNickname(
    @Param(ValidationPipe) param: NicknameParams,
  ): Promise<ResponseEntity<string>> {
    return lastValueFrom(
      await this.authClient.send('checkNickname', param.nickname),
    );
  }
}
