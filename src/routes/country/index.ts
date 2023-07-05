import express from 'express';
import _ from 'lodash';

import { SuccessResponse } from '../../core/ApiResponse';
import CountryService from '../../services/CountryService';
import authentication from '../../middleware/authentication';

const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    const countries = await CountryService.getAll();
    const data = _.map(countries, (country) => _.pick(country, ['_id' ,'name', 'code', 'dialCode', 'currency', 'currencySymbol']));
    return new SuccessResponse('success', data).send(res);
  }
);

/* ------- Anything else ----------------------------------------------- */
router.use(authentication);
/* --------------------------------------------------------------------- */

export default router;
