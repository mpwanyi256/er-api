export enum Key {
  MERCHANT_LATEST = 'MERCHANTS_LATEST',
}

export enum DynamicKey {
  MERCHANTS_SIMILAR = 'MERCHANTS_SIMILAR',
  MERCHANT = 'MERCHANT',
}

export type DynamicKeyType = `${DynamicKey}_${string}`;

export function getDynamicKey(key: DynamicKey, suffix: string) {
  const dynamic: DynamicKeyType = `${key}_${suffix}`;
  return dynamic;
}
