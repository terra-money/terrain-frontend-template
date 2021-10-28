import logo from './logo.svg';
import './App.css';

import { LocalTerra, MsgExecuteContract, StdFee } from '@terra-money/terra.js';
import { useEffect, useState } from 'react';


const terra = new LocalTerra()
const { validator, test1 } = terra.wallets;


const CONTRACT_ADDR = "terra18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5"

const increment = async (signer) => {
  const tx = await signer.createAndSignTx({
    msgs: [
      new MsgExecuteContract(
        signer.key.accAddress,
        CONTRACT_ADDR,
        { "increment": {} },
      ),

    ],
    fee: new StdFee(200000, { uluna: 10000 }),
  });

  return await terra.tx.broadcast(tx);
}

const reset = async (signer, count) => {
  const tx = await signer.createAndSignTx({
    msgs: [
      new MsgExecuteContract(
        signer.key.accAddress,
        CONTRACT_ADDR,
        { "reset": { count } },
      ),

    ],
    fee: new StdFee(200000, { uluna: 10000 }),
  });

  return await terra.tx.broadcast(tx);
}

const getCount = async () =>
  await terra.wasm.contractQuery(CONTRACT_ADDR, { "get_count": {} })


function App() {

  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)

  useEffect(() => {
    const prefetch = async () => {
      setCount((await getCount()).count)
      setUpdating(false)
    }
    prefetch()
  }, [])

  const onClickIncrement = async () => {
    setUpdating(true)
    const tx = await increment(validator);
    setCount((await getCount()).count)
    setUpdating(false)
  }

  const onClickReset = async () => {
    setUpdating(true)
    console.log(resetValue)
    const tx = await reset(validator, resetValue);
    setCount((await getCount()).count)
    setUpdating(false)
  }
  return (
    <div className="App">
      <header className="App-header">

        <p>
          COUNT: {count} {updating ? "(updating . . .)" : ""}
        </p>
        <button onClick={onClickIncrement}> + </button>
        <input type="number" onChange={e => setResetValue(+e.target.value)} value={resetValue} />
        <button onClick={onClickReset}> reset </button>
      </header>
    </div>
  );
}

export default App;
