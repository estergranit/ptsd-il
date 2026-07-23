import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../entities/users/users.service.ts';
import type { Configuration } from '../config/configuration.ts';
import type { JwtPayload } from './types/jwt-payload.type.ts';

@Injectable()
export class AuthService {
  readonly #googleClient: OAuth2Client;
  readonly #googleClientId: string;

  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    configService: ConfigService<Configuration, true>,
  ) {
    this.#googleClientId = configService.getOrThrow('google', { infer: true }).clientID;
    // eslint-disable-next-line @nestjs/use-dependency-injection
    this.#googleClient = new OAuth2Client(this.#googleClientId);
  }

  public async loginWithGoogle(idToken: string): Promise<{ accessToken: string }> {
    const email = await this.#verifyGoogleIdToken(idToken);
    return await this.#issueToken(email);
  }

  async #verifyGoogleIdToken(idToken: string): Promise<string> {
    let ticket;
    try {
      ticket = await this.#googleClient.verifyIdToken({
        idToken,
        audience: this.#googleClientId,
      });
    } catch {
      throw new UnauthorizedException('Invalid Google token');
    }

    const payload = ticket.getPayload();
    if (!payload?.email || !payload.email_verified) {
      throw new UnauthorizedException('Google account has no verified email');
    }

    return payload.email;
  }

  async #issueToken(email: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email ?? '', roles: user.roles };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
