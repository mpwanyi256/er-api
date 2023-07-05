import Joi from 'joi';
import { Header } from '../core/utils';
import { JoiAuthBearer } from '../helpers/validator';

export default {
  apiKey: Joi.object()
    .keys({
      [Header.API_KEY]: Joi.string().required(),
    })
    .unknown(true),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  businessType: Joi.object()
    .keys({
      businessType: Joi.string().required(),
    })
    .unknown(true),
  country: Joi.object()
    .keys({
      country: Joi.string().required(),
    })
};
