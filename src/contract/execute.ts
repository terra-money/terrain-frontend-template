import { LCDClient, MsgExecuteContract } from "@terra-money/feather.js";
import { getContractAddress } from "./address";
import { ConnectResponse, WalletResponse } from "@terra-money/wallet-kit";

// ==== utils ====

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const until = Date.now() + 1000 * 60 * 60;
const untilInterval = Date.now() + 1000 * 60;

const execTx =
  (msg: any, chainID: string) => async (wallet: WalletResponse, connected: ConnectResponse) => {
    const lcd = new LCDClient(wallet.network);

    const contractAddress = getContractAddress(connected.network, chainID)
    const walletAddress = connected.addresses[chainID]
    const execMsg = new MsgExecuteContract(walletAddress, contractAddress, msg)
    const tx = await wallet.post({ chainID, msgs: [execMsg]});
    const txHash = tx?.result?.txhash;

    while (true) {
      try {
        if (txHash) {
          return await lcd.tx.txInfo(txHash, chainID);
        }
      } catch (e) {
        if (Date.now() < untilInterval) {
          await sleep(500);
        } else if (Date.now() < until) {
          await sleep(1000 * 10);
        } else {
          throw new Error(
            `Transaction queued. To verify the status, please check the transaction hash: ${txHash}`
          );
        }
      }
    }
  };

// ==== execute contract ====

export const increment = (wallet: WalletResponse, connected: ConnectResponse, chainID: string) =>
  execTx({ increment: {} }, chainID)(wallet, connected);

export const reset = async (
  wallet: WalletResponse,
  connected: ConnectResponse,
  count: number,
  chainID: string
) => execTx({ reset: { count } }, chainID)(wallet, connected);
