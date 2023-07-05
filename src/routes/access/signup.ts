import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import UserRepo from '../../services/UserService';
import ProfileService from '../../services/ProfileService';
import { BadRequestError } from '../../core/ApiError';
import User from '../../models/User';
import { createTokens } from '../../middleware/authUtils';
import validator from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import { RoleCode } from '../../models/Role';
import { getUserData } from './utils';

const router = express.Router();

router.post(
  '/basic',
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if (user) throw new BadRequestError('User already registered');

    const {
     firstName,
     lastName,
     email,
     password,
    } = req.body;

    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user profile
    const userProfile = await ProfileService.create({
      firstName,
      lastName,
    })

    // Create user
    const { user: createdUser, keystore } = await UserRepo.create(
      {
        email,
        profile: userProfile._id,
        password: passwordHash,
      } as User,
      accessTokenKey,
      refreshTokenKey,
      RoleCode.USER,
    );

    const tokens = await createTokens(
      createdUser,
      keystore.primaryKey,
      keystore.secondaryKey,
    );
    const userProfileData = await UserRepo.findByEmail(email);
    if(!userProfileData) throw new BadRequestError('Something wet wrong')
    const userData = await getUserData(userProfileData);

    new SuccessResponse('Signup Successful', {
      user: userData,
      tokens: tokens,
    }).send(res);
  }),
);

export default router;
