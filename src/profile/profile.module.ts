import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileModel } from './profile.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileModel, collection: 'profiles' },
    ]),
  ],
})
export class ProfileModule {}
