import { ConnectedWallet } from "@terra-money/wallet-provider";
import config from "../refs.terrain.json";

export const getNetworkName = (wallet: ConnectedWallet) => {
  if (!wallet) return 'local'
  const chainIDs = Object.keys(wallet.addresses)
  return chainIDs.includes('phoenix-1') ? 'mainnet' : 
    chainIDs.includes('pisco-1') ? 'testnet' : 
    chainIDs.includes('columbus-5') ? 'classic' : 
    'local'
}

export const getTerraChain = (wallet: ConnectedWallet) => {
  if (!wallet) return ''
  const network = getNetworkName(wallet)
  return network === 'mainnet' ? 'phoenix-1' : network === 
    'testnet' ? 'pisco-1' : network === 'classic' ? 'columbus-5' : 'localterra'
}

export const getContractChains = (wallet: ConnectedWallet | undefined) => {
  if (!wallet) return []
  const network = getNetworkName(wallet)
  return Object.keys((config as any)[network])
}
