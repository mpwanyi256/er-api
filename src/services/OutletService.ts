import { Types } from 'mongoose';

import Outlet, { OutletModel } from '../models/Business';


async function findById(id: Types.ObjectId): Promise<Outlet | null> {
  return OutletModel.findOne({ _id: id })
    .select('+name +address +phone +email +status +createdBy +updatedBy +createdAt +updatedAt')
    .populate({
      path: 'createdBy',
      match: { status: true },
      select: { email: 1, status: 1 },
    })
    .populate({
      path: 'updatedBy',
      match: { status: true },
      select: { email: 1, status: 1 },
    })
    .lean()
    .exec();
}