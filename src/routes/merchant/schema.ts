import Joi from 'joi';
import { JoiObjectId } from '../../helpers/validator';


export default {
  register: Joi.object().keys({
    businessName: Joi.string().required(),
    address: Joi.string().required(),
    contactNumber: Joi.string().allow(null, ''),
    description: Joi.string().required(),
    tinNumber: Joi.string().allow(null, ''),
    country: JoiObjectId().required(),
  }),
  update: Joi.object().keys({
    address: Joi.string().required(),
    certificateOfRegistration: Joi.string().allow(null, ''),
    contactNumber: Joi.string().allow(null, ''),
    description: Joi.string().required(),
    email: Joi.string().email().required(),
    tinNumber: Joi.string().allow(null, ''),
  }),
};
