import Country, { CountryModel } from '../models/Country';

async function getAll(): Promise<Country[]> {
  return CountryModel.find({ status: true })
    .lean()
    .exec();
}

async function getById(id: string): Promise<Country | null> {
  return CountryModel.findOne({ _id: id, status: true })
    .lean()
    .exec();
}

async function create(data: Country): Promise<Country> {
  const country = new CountryModel(data);
  return country.save();
}

export default {
  getAll,
  getById,
  create,
};
