import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe.ts';
import { AllowedRoles, Public } from '../utilities/decorators.ts';
import { AuthService } from './auth.service.ts';
import { LoginSchema, type LoginDto } from './dto/login.dto.ts';
import { ChangePasswordSchema, type ChangePasswordDto } from './dto/change-password.dto.ts';
import { UserRoles } from '../entities/users/user.entity.ts';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  public login(@Body(new ZodValidationPipe(LoginSchema)) dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('change-password')
  @AllowedRoles([UserRoles.MASTERADMIN, UserRoles.ADMIN, UserRoles.MODERATOR, UserRoles.VIEWER])
  public changePassword(
    @Req() request: Request,
    @Body(new ZodValidationPipe(ChangePasswordSchema)) body: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      request.context.id,
      body.currentPassword,
      body.newPassword,
    );
  }
}
