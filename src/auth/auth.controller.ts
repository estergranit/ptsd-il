import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.ts';
import { Public } from '../utilities/decorators.ts';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.ts';
import { GoogleLoginSchema, type GoogleLoginDto } from './dto/google-login.dto.ts';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('google')
  @Public()
  public googleLogin(
    @Body(new ZodValidationPipe(GoogleLoginSchema)) body: GoogleLoginDto,
  ) {
    return this.authService.loginWithGoogle(body.idToken);
  }
}
