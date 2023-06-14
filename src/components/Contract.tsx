import { useEffect, useState } from "react";
import { useWallet, ConnectResponse } from "@terra-money/wallet-kit";
import * as execute from "../contract/execute";
import * as query from "../contract/query";
import { getContractChains } from "../contract/utils";

export const Contract = ({ connected }: { connected: ConnectResponse }) => {
  const wallet = useWallet();
  const [count, setCount] = useState<number | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [chainID, setChainID] = useState<string>("");
  const [contractChains, setContractChains] = useState<string[]>([]);
  const [resetValue, setResetValue] = useState(0);

  useEffect(() => {
    const chains = getContractChains(connected);
    if (chains?.length) {
      setContractChains(chains);
      setChainID(chains[0]);
    }
  }, [connected]);

  useEffect(() => {
    const prefetch = async () => {
      const res: any = await query.getCount(wallet, connected, chainID);
      setCount(res?.count);
    };
    prefetch();
  }, [chainID, connected, wallet]);

  const updateCount = async () => {
    setUpdating(true);
    const res: any = await query.getCount(wallet, connected, chainID);
    setCount(res?.count);
    setUpdating(false);
  };

  const onClickIncrement = async () => {
    try {
      setUpdating(true);
      await execute.increment(wallet, connected, chainID);
      await updateCount();
    } catch (err) {
      handleError(err);
    }
  };

  const onClickReset = async () => {
    try {
      setUpdating(true);
      await execute.reset(wallet, connected, chainID, resetValue);
      await updateCount();
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err: any) => {
    setUpdating(false);
    if (err.message.includes("User denied")) {
      alert("User denied transaction signature");
    } else if (err.message.includes("No client")) {
      alert("No wallet connected");
    } else {
      alert(err.message);
    }
  };

  const ChainButtons = () => (
    <>
      {contractChains.map((chain) => (
        <button
          style={{ opacity: chainID === chain ? "1" : "0.5" }}
          key={chain}
          type="button"
          onClick={() => setChainID(chain)}
        >
          {chain}
        </button>
      ))}
    </>
  );

  const ContractButtons = () => (
    <>
      {chainID ? (
        <div>
          COUNT: {updating ? "updating..." : count}
          <button onClick={onClickIncrement} type="button">
            +
          </button>
        </div>
      ) : (
        <div>
          {" "}
          {contractChains.length
            ? "Select a chain"
            : `Deploy a contract on ${connected.network}`}{" "}
        </div>
      )}
      <input
        type="number"
        onChange={(e) => setResetValue(+e.target.value)}
        value={resetValue}
      />
      <button onClick={onClickReset} type="button">
        reset
      </button>
    </>
  );

  return (
    <>
      <ChainButtons />
      <ContractButtons />
    </>
  );
};
