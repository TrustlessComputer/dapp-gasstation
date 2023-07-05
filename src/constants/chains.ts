import {L2_EXPLORER, L2_NETWORK_RPC, TC_NETWORK_RPC} from '@/configs';

export enum SupportedChainId {
  TRUSTLESS_COMPUTER = 22213,
  L2 = 42213,
}

export const TRUSTLESS_COMPUTER_CHAIN_INFO = {
  name: 'Trustless Computer',
  title: '',
  chain: 'TC',
  icon: '',
  rpc: [TC_NETWORK_RPC],
  faucets: [],
  nativeCurrency: {
    name: 'JUICE',
    symbol: 'TC',
    decimals: 18,
  },
  infoURL: 'https://trustless.computer',
  shortName: 'TC',
  chainId: SupportedChainId.TRUSTLESS_COMPUTER,
  networkId: SupportedChainId.TRUSTLESS_COMPUTER,
  slip44: 0,
  explorers: [
    {
      name: 'Trustless computer explorer',
      url: 'https://explorer.trustless.computer',
      standard: 'EIP3091',
    },
  ],
  ens: {
    registry: '',
  },
};

export const L2_CHAIN_INFO = {
  name: `NOS`,
  title: '',
  chain: 'NOS',
  icon: 'https://cdn.trustless.domains/icons/nos2.svg',
  rpc: [L2_NETWORK_RPC],
  faucets: [],
  nativeCurrency: {
    name: 'TCL2',
    symbol: 'TC',
    decimals: 18,
  },
  infoURL: 'https://trustless.computer',
  shortName: 'NOS',
  chainId: SupportedChainId.L2,
  networkId: SupportedChainId.L2,
  slip44: 0,
  explorers: [
    {
      name: 'Trustless Computer L2 explorer',
      url: L2_EXPLORER,
      standard: 'EIP3091',
    },
  ],
  ens: {
    registry: '',
  },
};