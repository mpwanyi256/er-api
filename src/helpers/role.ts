import { RoleCode } from '../models/Role';
import { RoleRequest } from 'app-request';
import { Response, NextFunction } from 'express';

export default (...roleCodes: RoleCode[]) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    req.currentRoleCodes = roleCodes;
    next();
  };
