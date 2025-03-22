import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './profile.model';
import { Model } from 'mongoose';
import { FindPayloadType } from 'utils/types';
import { getFindQueryProps } from 'utils/helpers';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel('Profile') private readonly ProfileModel: Model<Profile>,
  ) {}

  get(id: string): Promise<ProfileDocument> {
    return this.ProfileModel.findById(id).exec();
  }

  create(payload: Profile): Promise<ProfileDocument> {
    try {
      const findByPayload: FindPayloadType<Profile> = {
        filter: {
          email: payload.email,
        },
      };
      const user = this.ProfileModel.findOne(findByPayload);
      if (user) {
        throw new NotAcceptableException(
          'The account already exist with same email.Please choose another one',
        );
      }
      const createProfile = new this.ProfileModel(payload);
      return createProfile.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(payload: FindPayloadType<Profile>): Promise<ProfileDocument> {
    try {
      const { filter, ref } = getFindQueryProps(payload);
      return (await this.ProfileModel.findOne(filter)).populated(ref).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
