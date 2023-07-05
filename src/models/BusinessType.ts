import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'BusinessType';
export const COLLECTION_NAME = 'businessTypes';

export enum BusinessTypeCode {
  SOLE_PROPRIETORSHIP = "sole proprietorship",
  PARTNERSHIP = "partnership",
  CORPORATION = "corporation",
  LLT= "limited liability company",
  NGO= "non-profit organization",
  OTHERS= "others",
}

export default interface BusinessType {
  _id: Types.ObjectId;
  name: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<BusinessType>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(BusinessTypeCode),
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
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

schema.index({ name: 1, status: 1 });

export const BusinessTypeModel = model<BusinessType>(DOCUMENT_NAME, schema, COLLECTION_NAME);

