import { model, Schema, Types } from 'mongoose';
import Role from './Role';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User {
  _id: Types.ObjectId;
  email: string;
  emailVerified: boolean;
  profile: Types.ObjectId;
  password: string;
  roles?: Role[];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>(
  {
    email: {
      type: Schema.Types.String,
      unique: true,
      sparse: false, // allows null
      trim: true,
      select: false,
    },
    emailVerified: {
      type: Schema.Types.Boolean,
      default: false,
      select: false,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    roles: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
      required: true,
      select: false,
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

schema.index({ _id: 1, status: 1 });
schema.index({ email: 1 });
schema.index({ status: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
