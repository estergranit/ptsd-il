import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../entities/users/users.module.ts';
import { AuthController } from './auth.controller.ts';
import { AuthService } from './auth.service.ts';
import { AuthGuard } from './guards/auth.guard.ts';
import { RolesGuard } from './guards/roles.guard.ts';
import { GoogleStrategy } from './strategy/google.strategy.ts';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.getOrThrow<string>('jwt.secret'),
          signOptions: { expiresIn: config.getOrThrow('jwt.expiresIn') },
        }
      },
    }),
    PassportModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AuthService,
    GoogleStrategy,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
