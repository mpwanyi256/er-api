import Profile, { ProfileModel } from '../models/Profile';
import { Types } from 'mongoose';
import User, { UserModel } from '../models/User';

async function create({ firstName, lastName }: { firstName: string, lastName: string }): Promise<Profile> {
    const now = new Date();
    return ProfileModel.create({
    firstName,
    lastName,
    createdAt: now,
    updatedAt: now,
  });
}

// async function findById(
//     id: Types.ObjectId,
//   ): Promise<User | null> {
//     return UserModel.findOne({ _id: id, status: true })
//       .select('+email')
//       .populate({
//         path: 'roles',
//         match: { status: true },
//         select: { code: 1 },
//       })
//       .lean<User>()
//       .exec();
//     }

async function findById(id: Types.ObjectId): Promise<Profile | null> {
  return ProfileModel.findOne({ _id: id }).lean<Profile>().exec();
}

async function update({ firstName, lastName, mobileNumber, profilePictureURL, _id }: Profile): Promise<Profile | null> {
  const now = new Date();
  return ProfileModel.findOneAndUpdate(
    { _id },
    {
      firstName,
      lastName,
      mobileNumber,
      profilePictureURL,
      updatedAt: now,
    },
    { new: true },
  )
    .lean<Profile>()
    .exec();
}

export default {
  create,
  update,
  findById,
};
