import { model, Schema, Types } from 'mongoose';

import User from "./User";

export const DOCUMENT_NAME = 'Merchant';
export const COLLECTION_NAME = 'merchants';

export default interface Merchant {
  _id: Types.ObjectId;
  user: User;
  country: Types.ObjectId;
  businessName: string;
  address: string;
  contactNumber?: string;
  description: string;
  email: string;
  isVerified: boolean;
  tinNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Merchant>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
    businessName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    address: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: Schema.Types.String,
      default: null,
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    isVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    tinNumber: {
      type: Schema.Types.String,
      default: null,
      trim: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

schema.index({ email: 1, status: 1 });
schema.index({ status: 1 });

export const MerchantModel = model<Merchant>(DOCUMENT_NAME, schema, COLLECTION_NAME);
