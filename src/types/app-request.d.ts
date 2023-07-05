import { Request } from 'express';
import User from '../models/User';
import BusinessType from '../models/BusinessType';
import Keystore from '../models/Keystore';
import ApiKey from '../models/ApiKey';
import Country from '../models/Country';

declare interface PublicRequest extends Request {
  apiKey: ApiKey;
  businessType?: BusinessType;
  country?: Country;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
