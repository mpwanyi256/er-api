import { getJson, setJson } from '../query';
import { Types } from 'mongoose';
import Merchant from '../../models/Merchant';
import { DynamicKey, getDynamicKey } from '../keys';
import { caching } from '../../config';
import { addMillisToCurrentDate } from '../../helpers/utils';

function getKeyForId(merchantId: Types.ObjectId) {
  return getDynamicKey(DynamicKey.MERCHANT, merchantId.toHexString());
}

function getKeyForUrl(blogUrl: string) {
  return getDynamicKey(DynamicKey.MERCHANT, blogUrl);
}

async function save(m: Merchant) {
  return setJson(
    getKeyForId(m._id),
    { ...m },
    addMillisToCurrentDate(caching.contentCacheDuration),
  );
}

async function fetchById(merchantId: Types.ObjectId) {
  return getJson<Merchant>(getKeyForId(merchantId));
}

async function fetchByUrl(blogUrl: string) {
  return getJson<Merchant>(getKeyForUrl(blogUrl));
}

export default {
  save,
  fetchById,
  fetchByUrl,
};
