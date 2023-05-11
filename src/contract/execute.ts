import { LCDClient, MsgExecuteContract } from "@terra-money/feather.js";
import { ConnectedWallet } from "@terra-money/wallet-provider";
import { getContractAddress } from "./address";

// ==== utils ====

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const until = Date.now() + 1000 * 60 * 60;
const untilInterval = Date.now() + 1000 * 60;

const _exec = (msg: any, chainID: string) =>
  async (wallet: ConnectedWallet) => {
    const lcd = new LCDClient(wallet.network);

    const { result } = await wallet.post({
      chainID,
      msgs: [
        new MsgExecuteContract(
          wallet.addresses[chainID],
          getContractAddress(wallet, chainID),
          msg
        ),
      ],
    });

    while (true) {
      try {
        return await lcd.tx.txInfo(result.txhash, chainID);
      } catch (e) {
        if (Date.now() < untilInterval) {
          await sleep(500);
        } else if (Date.now() < until) {
          await sleep(1000 * 10);
        } else {
          throw new Error(
            `Transaction queued. To verify the status, please check the transaction hash: ${result.txhash}`
          );
        }
      }
    }
  };

// ==== execute contract ====

export const increment = (wallet: ConnectedWallet, chainID: string) => _exec({ increment: {} }, chainID)(wallet);

export const reset = async (wallet: ConnectedWallet, count: number, chainID: string) =>
  _exec({ reset: { count } }, chainID)(wallet);