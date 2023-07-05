import express from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import validator,{ ValidationSource } from '../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../helpers/asyncHandler';
import { BadRequestError, NotFoundError } from '../../core/ApiError';
import authentication from '../../middleware/authentication';
import { ProtectedRequest } from 'app-request';
import MerchantService from '../../services/MerchantService';
import CountryService from '../../services/CountryService';
import _ from 'lodash';
import Merchant from '../../models/Merchant';


const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/


router.get(
  '/account',
  asyncHandler(async (req: ProtectedRequest, res) => {
    const userId = req.user._id;

    const merchant = await MerchantService.findByUser(userId);
    if (!merchant) throw new NotFoundError('User is not a merchant');

    return new SuccessResponse(
      'success',
      _.pick(merchant, ['_id', 'businessName', 'countryId', 'address', 'contactNumber', 'description', 'isVerified', 'tinNumber', 'createdAt']),
    ).send(res);
  }),
);

router.post(
  '/register',
  validator(schema.register, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    // Refactor logic to make sure User has a verified Email address
    const userId = req.user._id;
    const { businessName, address, contactNumber, description, tinNumber, country } = req.body;

    // validate country
    const isValidCountry = await CountryService.getById(country);
    if (!isValidCountry) throw new BadRequestError('Invalid country provided');

    const merchant = await MerchantService.findByUser(userId);
    if (merchant) throw new BadRequestError('User is already a merchant');
    const email = req.user.email;

    const now = new Date();
    const account = {
      user:req.user,
      email,
      country,
      businessName,
      address,
      contactNumber,
      description,
      tinNumber,
      isVerified: false,
      createdAt: now,
      updatedAt: now,
    };
    const newMerchant = await MerchantService.create(account as Merchant);
    
    return new SuccessResponse('Merchant registered', _.pick(newMerchant, ['_id', 'businessName', 'country', 'address', 'email', 'contactNumber', 'description', 'isVerified', 'tinNumber', 'createdAt'])).send(res);
  }),
);

router.put(
  '/update',
  validator(schema.update, ValidationSource.BODY),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const userId = req.user._id;
    const { businessName, address, contactNumber, description, tinNumber, email } = req.body;

    const merchant = await MerchantService.findByUser(userId);
    if (!merchant) throw new NotFoundError('User is not a merchant');

    const now = new Date();

    if (businessName) merchant.businessName = businessName;
    if (tinNumber) merchant.tinNumber = tinNumber;
    if (email) merchant.email = email;
    if (address) merchant.address = address;
    if (contactNumber) merchant.contactNumber = contactNumber;
    if (description) merchant.description = description;
    if (tinNumber) merchant.tinNumber = tinNumber;
    if (email) merchant.email = email;
    if (address) merchant.address = address;
    if (contactNumber) merchant.contactNumber = contactNumber;


    const updatedMerchant = await MerchantService.update(merchant);
    
    return new SuccessResponse('Merchant updated', _.pick(updatedMerchant, ['_id', 'businessName', 'businessType', 'address', 'email', 'contactNumber', 'description', 'isVerified', 'tinNumber', 'createdAt'])).send(res);
  }),
);

export default router;