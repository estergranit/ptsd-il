import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.ts';
import { GoogleOauthGuard } from './guards/google-oauth.guard.ts';
import { Public } from '../utilities/decorators.ts';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async auth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  public async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { email } = req.user as { email: string };
    const token = await this.authService.login(email);

    res.cookie('access_token', token.accessToken, { httpOnly: true });

    return res.sendStatus(HttpStatus.OK);
  }
}
