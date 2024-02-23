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
import {
  ResponseAccessDto,
  ResponseCheckDto,
  ResponseEntity,
} from 'src/data/entity/ResponseEntity';
import { Observable, lastValueFrom } from 'rxjs';
import { AccessTokenDto } from 'src/data/dto/user/response/auth.access.dto';
import {
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

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

@ApiTags('유저 API')
@Controller('user')
export class AuthController {
  constructor(
    @Inject('AUTH')
    private readonly authClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: '일반 사용자 회원가입' })
  @ApiBody({
    type: AuthCreateDto,
    description: '회원가입에 대한 필수 요청 항목',
  })
  @ApiResponse({
    description: '회원가입 성공 응답',
    type: ResponseEntity,
  })
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCreateDto: AuthCreateDto,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(this.authClient.send('signUp', authCreateDto));
  }

  @Post('/signin')
  @ApiOperation({ summary: '일반 사용자 로그인' })
  @ApiBody({
    type: AuthLoginDto,
    description: '로그인에 대한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseAccessDto,
  })
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return await lastValueFrom(this.authClient.send('signIn', authLoginDto));
  }

  @ApiOperation({ summary: '게스트 사용자 회원가입' })
  @ApiBody({
    type: AuthCreateGuestDto,
    description: '게스트 회원가입에 대한 필수 요청 항목',
  })
  @ApiResponse({
    description: '회원가입 성공 응답',
    type: ResponseEntity,
  })
  @Post('signup/guest')
  async guestSignUp(
    @Body(ValidationPipe) authCreateGuestDto: AuthCreateGuestDto,
  ): Promise<ResponseEntity<string>> {
    return await lastValueFrom(
      this.authClient.send('guestSignUp', authCreateGuestDto),
    );
  }

  @ApiOperation({ summary: '게스트 사용자 로그인' })
  @ApiBody({
    type: AuthLoginGuestDto,
    description: '게스트 로그인에 대한 필수 요청 항목',
  })
  @ApiResponse({
    type: ResponseAccessDto,
  })
  @Post('signin/guest')
  async guestSignIn(
    @Body(ValidationPipe) authLoginDto: AuthLoginGuestDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return lastValueFrom(
      await this.authClient.send('guestSignIn', authLoginDto),
    );
  }

  @ApiOperation({ summary: '아이디 중복확인' })
  @ApiParam({
    name: 'id',
    description: '중복 확인할 아이디',
  })
  @ApiResponse({
    type: ResponseCheckDto,
  })
  @Get('userid/:id/duplicate')
  async checkUsername(
    @Param(ValidationPipe) param: userIdParams,
  ): Promise<ResponseEntity<string>> {
    return lastValueFrom(await this.authClient.send('checkAddress', param.id));
  }

  @ApiOperation({ summary: '닉네임 중복확인' })
  @ApiParam({
    name: 'nickname',
    description: '중복 확인할 닉네임',
  })
  @ApiResponse({
    type: ResponseCheckDto,
  })
  @Get('nickname/:nickname/duplicate')
  async checkNickname(
    @Param(ValidationPipe) param: NicknameParams,
  ): Promise<ResponseEntity<string>> {
    return lastValueFrom(
      await this.authClient.send('checkNickname', param.nickname),
    );
  }
}
