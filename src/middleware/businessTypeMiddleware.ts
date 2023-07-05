import express from 'express';
import BusinessTypeService from '../services/BusinessTypeService';
import validator,{ ValidationSource } from '../helpers/validator';
import { BadRequestError } from '../core/ApiError';
import { PublicRequest } from 'app-request';
import schema from './schema';

const router = express.Router();

export default router.use(
  validator(schema.businessType, ValidationSource.BODY),
  async (req: PublicRequest, res, next) => {
    const { businessType } = req.body;
    const isValidBusinessType = await BusinessTypeService.exists(businessType);
    if (!isValidBusinessType) throw new BadRequestError('Invalid businessType provided');

    req.businessType = businessType;
    return next();
  }
);
