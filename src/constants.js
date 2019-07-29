import colors from './colors';

export const networkProtocols = Object.freeze({
  ETHEREUM: 'ethereum',
  SUBSTRATE: 'substrate'
});

export const networkKeys = Object.freeze({
  // Ethereum
  CLASSIC: 'classic',
  FRONTIER: 'frontier',
  GOERLI: 'goerli',
  KOVAN: 'kovan',
  ROPSTEN: 'ropsten',
  // Substrate
  KUSAMA: 'kusama'
});

const defaultEthereumParams = {
  color: '#F2E265',
  protocol: networkProtocols.ETHEREUM,
  secondaryColor: colors.card_text,
}

const defaultSubstrateParams = {
  color: '#4C4646',
  protocol: networkProtocols.SUBSTRATE,
  secondaryColor: colors.card_bg,
}

export const NETWORK_LIST = Object.freeze({
  // Substrate
  [networkKeys.KUSAMA]: {
    ...defaultSubstrateParams,
    balanceModuleId: 123, // This id needs to be checked
    title: 'Kusama',
    ss58Prefix: 2
  },
  // Ethereum
  [networkKeys.FRONTIER]: {
    ...defaultEthereumParams,
    color: '#977CF6',
    ethereumChainId: 1,
    secondaryColor: colors.card_bg,
    title: 'Ethereum',
  },
  [networkKeys.CLASSIC]: {
    ...defaultEthereumParams,
    color: '#8C7166',
    ethereumChainId: 61,
    secondaryColor: colors.card_bg,
    title: 'Ethereum Classic',
  },
  [networkKeys.ROPSTEN]: {
    ...defaultEthereumParams,
    ethereumChainId: 3,
    title: 'Ropsten Testnet'
  },
  [networkKeys.GOERLI]: {
    ...defaultEthereumParams,
    ethereumChainId: 5,
    title: 'Görli Testnet'
  },
  [networkKeys.KOVAN]: {
    ...defaultEthereumParams,
    ethereumChainId: 42,
    title: 'Kovan Testnet'
  }
});
