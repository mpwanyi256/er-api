import BusinessType,{ BusinessTypeModel } from '../models/BusinessType';


async function findByCode(code: string): Promise<BusinessType | null> {
  return BusinessTypeModel.findOne({ code: code, status: true }).lean().exec();
}

async function create(
  businessType: BusinessType,
): Promise<BusinessType> {
  const createdBusinessType = await BusinessTypeModel.create(businessType);
  return createdBusinessType;
}

async function update(
  businessType: BusinessType,
): Promise<BusinessType> {
  businessType.updatedAt = new Date();
  await BusinessTypeModel.updateOne({ _id: businessType._id }, { $set: { ...businessType } })
    .lean()
    .exec();
  return businessType;
}

async function exists(id: string): Promise<boolean> {
  const businessType = await BusinessTypeModel.exists({ _id: id, status: true });
  return businessType !== null && businessType !== undefined;
}

async function findActive(): Promise<BusinessType[]> {
  return BusinessTypeModel.find({ status: true }).select('_id name').lean().exec();
}


export default {
  findByCode,
  create,
  update,
  exists,
  findActive,
};
