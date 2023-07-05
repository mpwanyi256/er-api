import express from 'express';
import { Types } from 'mongoose';

import { SuccessResponse } from '../../core/ApiResponse';
import validator from '../../helpers/validator';
import schema from './schema';
import UserService from '../../services/UserService';
import ProfileService from '../../services/ProfileService';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import asyncHandler from '../../helpers/asyncHandler';
import _ from 'lodash';
import authentication from '../../middleware/authentication';
import { getUserData } from '../access/utils';

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  '/me',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserService.findByEmail(req.user.email);
    if (!user) throw new BadRequestError('User not registered');

    const userData = await getUserData(user);

    return new SuccessResponse(
      'success',
      {
        user: userData,
      }
    ).send(res);
  }),
);

router.put(
  '/',
  validator(schema.profile),
  asyncHandler(async (req: ProtectedRequest, res) => {
    if (!req.user.profile) throw new BadRequestError('User not registered');
    const profile = await ProfileService.findById(new Types.ObjectId(req.user.profile._id));
    if (!profile) throw new BadRequestError('User not registered');

    const { firstName, lastName, mobileNumber, profilePictureURL } = req.body;

    if(firstName) profile.firstName = firstName;
    if(lastName) profile.lastName = lastName;
    if(mobileNumber) profile.mobileNumber = mobileNumber;
    if(profilePictureURL) profile.profilePictureURL = profilePictureURL;

    const updatedProfile = await ProfileService.update(profile);

    const data = _.pick(updatedProfile, ['firstName', 'lastName', 'mobileNumber', 'profilePictureURL']);

    return new SuccessResponse('Profile updated', data).send(res);
  }),
);

export default router;
