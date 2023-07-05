import { Types } from 'mongoose';

import Merchant, { MerchantModel } from '../models/Merchant';

const MERCHANT_DETAIL = '+businessName +address +contactNumber +description +email +isVerified +tinNumber';

async function findById(id: Types.ObjectId): Promise<Merchant | null> {
  return MerchantModel.findOne({ _id: id })
    .select(MERCHANT_DETAIL)
    .populate({
      path: 'user',
      match: { status: true },
      select: { email: 1, status: 1 },
    })
    .lean()
    .exec();
}

async function findByUser(userId: Types.ObjectId): Promise<Merchant | null> {
  return MerchantModel.findOne({ user: userId, status: true })
    .select(MERCHANT_DETAIL)
    .populate({
      path: 'user',
      match: { status: true },
      select: { email: 1, status: 1 },
    })
    .populate({
      path: 'country',
      match: { status: true },
      select: { name: 1 },
    })
    .lean()
    .exec();
}

async function exists(id: Types.ObjectId): Promise<boolean> {
  const merchant = await MerchantModel.exists({ _id: id, status: true });
  return merchant !== null && merchant !== undefined;
}

async function create(merchant: Merchant): Promise<Merchant> {
  merchant.createdAt = new Date();
  const createdMerchant = await MerchantModel.create(merchant);
  return createdMerchant.toObject();
}

async function update(merchant: Merchant): Promise<Merchant | null> {
  merchant.updatedAt = new Date();
  return MerchantModel.findOneAndUpdate(
    { _id: merchant._id },
    merchant,
    { new: true },
  ).lean().exec();
}

async function verifyMerchant(id: Types.ObjectId, status: boolean): Promise<Merchant | null> {
  return MerchantModel.findOneAndUpdate(
    { _id: id },
    { isVerified: status },
    { new: true },
  ).lean().exec();
}

export default {
  findById,
  findByUser,
  exists,
  create,
  update,
  verifyMerchant,
};
