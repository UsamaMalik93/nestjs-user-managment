import { FilterQuery, QueryOptions } from 'mongoose';
import { ProfileDocument } from 'src/profile/profile.model';

export type SignInPayload = {
  email: string;
  password: string;
};

export type FindPayloadType<Model> = {
  filter?: FilterQuery<Model>;
  options?: QueryOptions;
  ref?: any;
  where?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  projection?: Record<string, 1 | 0>;
};

export interface ITokenReturnBody {
  user: Partial<ProfileDocument>;
}
