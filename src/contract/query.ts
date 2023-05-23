import { LCDClient } from "@terra-money/feather.js";
import { ConnectResponse } from "@terra-money/wallet-interface";
import { getContractAddress } from "./address";
import { WalletResponse } from "types";

export const getCount = async (wallet: WalletResponse, connected: ConnectResponse, chainID: string) => {
  const lcd = new LCDClient(wallet.network);
  const address = getContractAddress(connected?.network, chainID);
  return lcd.wasm.contractQuery(address, { get_count: {} });
};
