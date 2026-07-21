import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.ts';
import { Public } from '../utilities/decorators.ts';
import { AuthService } from './auth.service.ts';
import { LoginSchema, type LoginDto } from './dto/login.dto.ts';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  public login(@Body(new ZodValidationPipe(LoginSchema)) dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
