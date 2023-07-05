import User from '../../models/User';
import _ from 'lodash';

export const enum AccessMode {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

export async function getUserData(user: User) {
  const data = _.pick(user, ['_id', 'email', 'emailVerified', 'status', 'createdAt', 'roles', 'profile', 'profilePicUrl']);
  return data;
}
