import { ProfileDocument } from 'src/profile/profile.model';

export type CreateToken = Pick<
  ProfileDocument,
  '_id' | 'email' | 'avatar' | 'roles'
> & {
  expireTime?: string;
};
