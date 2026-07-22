import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type VerifyCallback } from 'passport-google-oauth2';
import type { Configuration } from '../../config/configuration.ts';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor(configService: ConfigService<Configuration, true>) {
    const google = configService.getOrThrow('google', { infer: true });

    super({
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: google.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  public validate(
    _accessToken: string,
    _refreshToken: string,
    profile: { emails?: { value: string }[] },
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      done(new Error('Google profile has no email'), false);
      return;
    }

    done(null, { email });
  }
}
