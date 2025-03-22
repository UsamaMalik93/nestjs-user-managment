import * as crypto from 'crypto';
import { FindPayloadType } from './types';

export const createAvatarURL = (role: string) => {
  return `https://ui-avatars.com/api/?name=${role}`;
};

export const encryptPassword = (password: string) => {
  return crypto.createHmac('sha256', password).digest('hex');
};

export const getFindQueryProps = (payload: FindPayloadType<any>) => {
  const {
    filter = {},
    options = {},
    ref = {},
    where = {},
    sort = {},
  } = payload;
  return { filter, options, ref, where, sort };
};
