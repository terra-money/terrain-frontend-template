import { LCDClient } from '@terra-money/feather.js'
import { ConnectedWallet } from '@terra-money/wallet-provider'
import { getContractAddress } from './address'

export const getCount = async (wallet: ConnectedWallet, chainID: string) => {
  const lcd = new LCDClient(wallet.network)
  const address = getContractAddress(wallet, chainID)
  return lcd.wasm.contractQuery(address, { get_count: {} })
}