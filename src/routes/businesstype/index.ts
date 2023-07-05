import express from 'express';
import _ from 'lodash';

import { SuccessResponse } from '../../core/ApiResponse';
import BusinessTypeService from '../../services/BusinessTypeService';

const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    const businessTypes = await BusinessTypeService.findActive();
    return new SuccessResponse('success', businessTypes).send(res);
  }
);

export default router;
