import "./App.css";
import { useEffect, useState, useCallback } from "react";
import {
  useConnectedWallet,
  useWallet,
  WalletStatus,
} from "@terra-money/wallet-kit";

import * as execute from "./contract/execute";
import * as query from "./contract/query";
import { ConnectWallet } from "./components/ConnectWallet";
import { getContractChains } from "./contract/utils";

const App = () => {
  const connected = useConnectedWallet();
  const wallet = useWallet();
  const [count, setCount] = useState(null);
  const [updating, setUpdating] = useState(true);

  const [chainID, setChainID] = useState("");

  const [contractChains, setContractChains] = useState([""]);
  const [resetValue, setResetValue] = useState(0);


  useEffect(() => {
    if (connected) {
      const chains = getContractChains(connected);
      setContractChains(chains);
      if (chains.length === 1) setChainID(chains[0]);
    }
  }, [connected]);

  useEffect(() => {
    const prefetch = async () => {
      setUpdating(true);
      if (connected) {
        const { count }: any = await query.getCount(wallet, connected, chainID);
        setCount(count);
      }
      setUpdating(false);
    };
    prefetch();
  }, [connected, chainID, wallet]);

  const onClickIncrement = async () => {
    if (connected) {
      setUpdating(true);
      await execute.increment(wallet, connected, chainID);
      await fetchCount();
    }
  };

  const onClickReset = async () => {
    if (connected) {
      setUpdating(true);
      await execute.reset(wallet, connected, resetValue, chainID);
      await fetchCount();
    }
  };

  const fetchCount = useCallback(async () => {
    if (connected) {
      setUpdating(true);
      const { count }: any = await query.getCount(wallet, connected, chainID);
      setCount(count);
      setUpdating(false);
    }
  }, [connected, chainID, wallet]);

  return (
    <div className="App">
      <header className="App-header">
        {contractChains.map((chain) => (
          <button
            style={{ opacity: chainID === chain ? "1 " : "0.5" }}
            key={chain}
            type="button"
            onClick={() => setChainID(chain)}
          >
            {chain}
          </button>
        ))}
        {chainID ? (
          <div>
            COUNT: {count} {updating && "(updating ...)"}
            <button onClick={onClickIncrement} type="button">
              +
            </button>
          </div>
        ) : (
          <div> Please select a chain </div>
        )}
        {wallet.status === WalletStatus.CONNECTED && (
          <div>
            <input
              type="number"
              onChange={(e) => setResetValue(+e.target.value)}
              value={resetValue}
            />
            <button onClick={onClickReset} type="button">
              reset
            </button>
          </div>
        )}
      </header>
      <ConnectWallet chainID={chainID} />
    </div>
  );
};

export default App;
