import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Outlet';
export const COLLECTION_NAME = 'outlets';

export default interface Outlet {
  _id: Types.ObjectId;
  merchant: Types.ObjectId;
  country: Types.ObjectId;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: boolean;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Outlet>(
  {
    merchant: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Merchant',
    },
    country: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Country',
    },
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    address: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    phone: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      maxlength: 2000,
      trim: true,
    },
    status: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

schema.index({ name: 'text', address: 'text' });
schema.index({ name: 1, address: 1 }, { unique: true });
schema.index({ merchant: 1, name: 1 }, { unique: true });
schema.index({ merchant: 1, address: 1 }, { unique: true });
schema.index({ merchant: 1, phone: 1 }, { unique: true });
schema.index({ merchant: 1, email: 1 }, { unique: true });
schema.index({ merchant: 1, status: 1 });
schema.index({ merchant: 1, createdBy: 1 });
schema.index({ merchant: 1, updatedBy: 1 });
schema.index({ merchant: 1, createdAt: 1 });
schema.index({ merchant: 1, updatedAt: 1 });

export const OutletModel = model<Outlet>(DOCUMENT_NAME, schema, COLLECTION_NAME);
