import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { APP_ROLES, PROFILE_STATUS } from 'utils/constants';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String, select: false })
  password: string;

  @Prop({ required: false, default: false, type: Boolean })
  deleted?: boolean;

  @Prop({
    required: true,
    type: [String],
    enum: PROFILE_STATUS,
    default: PROFILE_STATUS.EMAIL_SENT,
  })
  isVerified: PROFILE_STATUS;

  @Prop({ required: false, type: Boolean, default: false })
  disabled?: boolean;

  @Prop({ required: true, type: String })
  avatar: string;

  @Prop({
    required: true,
    type: [String],
    enum: APP_ROLES,
    default: [APP_ROLES.CONTRACTOR],
  })
  roles: APP_ROLES[];

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId }) //TODO ref: Company.name from Company model
  company: string;
}
export const ProfileModel = SchemaFactory.createForClass(Profile);
