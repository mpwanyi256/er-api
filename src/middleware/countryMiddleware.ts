import express from 'express';

import CountryService from '../services/CountryService';
import validator, { ValidationSource } from '../helpers/validator';
import { BadRequestError } from '../core/ApiError';
import { PublicRequest } from 'app-request';
import schema from './schema';

const router = express.Router();

export default router.use(
  validator(schema.country, ValidationSource.BODY),
  async (req: PublicRequest, res, next) => {
    const { country } = req.body;
    const isValidCountry = await CountryService.getById(country);
    if (!isValidCountry) throw new BadRequestError('Invalid country provided');

    req.country = country;
    return next();
  }
);
