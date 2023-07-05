import { model, Schema, Types } from 'mongoose';
export const DOCUMENT_NAME = 'Profile';
export const COLLECTION_NAME = 'profiles';

export default interface Profile {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  mobileNumber?: string;
  profilePictureURL?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Profile>(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Schema.Types.String,
      trim: true,
      default: null,
    },
    profilePictureURL: {
      type: Schema.Types.String,
      trim: true,
      default: null,
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

schema.index({ user: 1 });

export const ProfileModel = model<Profile>(
    DOCUMENT_NAME,
    schema,
    COLLECTION_NAME,
);
