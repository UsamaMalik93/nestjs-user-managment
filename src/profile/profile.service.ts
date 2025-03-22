import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterProfileDto } from 'src/auth/dto/register-profile.dto';
import { APP_ROLES, PROFILE_STATUS } from 'utils/constants';
import { createAvatarURL, encryptPassword } from 'utils/helpers';
import { ProfileRepository } from './profile.repository';
import { FindPayloadType } from 'utils/types';
import { Profile, ProfileDocument } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  private readonly logger = new Logger(ProfileService.name);

  async create(registerProfileDto: RegisterProfileDto) {
    try {
      let password = registerProfileDto.password;
      const payload = {
        ...registerProfileDto,
        password,
        avatar: createAvatarURL(registerProfileDto.name),
        isVerified: PROFILE_STATUS.NONE,
        roles: [APP_ROLES.CONTRACTOR],
      };
      this.profileRepository.create(payload);
    } catch (error) {
      this.logger.log('Error creating the Profile');
      throw new BadRequestException(
        'Something went wrong while creating profile',
      );
    }
  }

  async getByEmailPass(email: string, password: string): Promise<Profile> {
    try {
      const payload: FindPayloadType<ProfileDocument> = {
        filter: {
          email,
          password: encryptPassword(password),
        },
      };
      return await this.profileRepository.findOne(payload);
    } catch (error) {}
  }

  async getByEmail(email: string): Promise<ProfileDocument> {
    try {
      const payload: FindPayloadType<Profile> = {
        filter: { email },
      };
      return this.profileRepository.findOne(payload);
    } catch (error) {
      this.logger.log('Error finding profile', error);
      throw new BadRequestException(
        'Something went wrong while finding profile',
      );
    }
  }
}
