import { ConnectedWallet } from "@terra-money/wallet-provider";
import config from "../refs.terrain.json";

export const getNetworkName = (wallet: ConnectedWallet) => {
  if (!wallet) return 'localterra'
  const chainIDs = Object.keys(wallet.addresses)
  return chainIDs.includes('phoenix-1') ? 'mainnet' : 
    chainIDs.includes('pisco-1') ? 'testnet' : 
    chainIDs.includes('columbus-5') ? 'classic' : 
    'localterra'
}

export const getTerraChain = (wallet: ConnectedWallet) => {
  if (!wallet) return ''
  const network = getNetworkName(wallet)
  return network === 'mainnet' ? 'phoenix-1' : network === 
    'testnet' ? 'pisco-1' : network === 'classic' ? 'columbus-5' : 'localterra'
}

export const getContractChains = (wallet: ConnectedWallet) => {
  const network = getNetworkName(wallet)
  const contractChains = (config as any)[network]
  if (contractChains) {
    return Object.keys(contractChains)
  } else {
    alert (`No contracts found on ${network}, change your network on the Station extension or deploy`)
    return []
  }
}
