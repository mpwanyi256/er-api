import { Schema, model, Types } from 'mongoose';

export const DOCUMENT_NAME = 'Country';
export const COLLECTION_NAME = 'countries';

export default interface Country {
  _id: Types.ObjectId;
  name: string;
  code: string;
  dialCode: string;
  currency: string;
  currencySymbol: string;
  vatPercentageRate: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<Country>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    code: {
      type: Schema.Types.String,
      required: true,
    },
    dialCode: {
      type: Schema.Types.String,
      required: true,
    },
    currency: {
      type: Schema.Types.String,
      required: true,
    },
    currencySymbol: {
      type: Schema.Types.String,
      required: true,
    },
    vatPercentageRate: {
      type: Schema.Types.Number,
      required: true,
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

export const CountryModel = model<Country>(DOCUMENT_NAME, schema, COLLECTION_NAME);
