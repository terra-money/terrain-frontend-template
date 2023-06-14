import { LCDClient } from "@terra-money/feather.js";
import { ConnectResponse, WalletResponse } from "@terra-money/wallet-kit";
import { getContractAddress } from "./address";

export const getCount = async (wallet: WalletResponse, connected: ConnectResponse, chainID: string) => {
  const lcd = new LCDClient(wallet.network);
  const address = getContractAddress(connected.network, chainID);
  if (!address) return;
  return lcd.wasm.contractQuery(address, { get_count: {} });
};
