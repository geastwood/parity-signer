import { NETWORK_LIST, networkKeys, networkProtocols } from '../constants';

export function accountId({
  address,
  protocol = networkProtocols.ETHEREUM,
  ethereumChainId = NETWORK_LIST[networkKeys.FRONTIER].ethereumChainId
}) {
  if (typeof address !== 'string' || address.length === 0) {
    throw new Error(`Couldn't create an accountId, missing address`);
  }
  return `${protocol}:0x${address.toLowerCase()}@${ethereumChainId}`;
}

export function empty(account = {}) {
  return {
    name: '',
    protocol: networkProtocols.SUBSTRATE,
    networkKey: networkKeys.KUSAMA,
    seed: '',
    address: '',
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    archived: false,
    encryptedSeed: null,
    validBip39Seed: false,
    ...account
  };
}

export function validateSeed(seed, validBip39Seed) {
  if (seed.length === 0) {
    return {
      accountRecoveryAllowed: false,
      reason: `A seed phrase is required.`,
      valid: false
    };
  }
  const words = seed.split(' ');

  for (let word of words) {
    if (word === '') {
      return {
        accountRecoveryAllowed: true,
        reason: `Extra whitespace found.`,
        valid: false
      };
    }
  }

  if (!validBip39Seed) {
    return {
      accountRecoveryAllowed: true,
      reason: `This recovery phrase will be treated as a legacy Parity brain wallet.`,
      valid: false
      
    };
  }

  return {
    reason: null,
    valid: true
  };
}
