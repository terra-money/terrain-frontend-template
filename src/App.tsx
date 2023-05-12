import './App.css'
import { useEffect, useState, useCallback } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'
import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'
import { getContractChains } from './contract/utils'

const App = () => {
  const connectedWallet = useConnectedWallet()
  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)

  const [chainID, setChainID] = useState('')

  const [contractChains, setContractChains] = useState([''])
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()

  useEffect(() => {
    if (connectedWallet) {
      const chains = getContractChains(connectedWallet)
      setContractChains(chains)
      if (chains.length === 1) setChainID(chains[0])
    }
  }, [connectedWallet])


  useEffect(() => {
    const prefetch = async () => {
      setUpdating(true)
      if (connectedWallet) {
        const { count } : any = await query.getCount(connectedWallet, chainID)
        setCount(count)
      }      
      setUpdating(false)
    }
    prefetch()
  },[connectedWallet, chainID])

  const onClickIncrement = async () => {
    if (connectedWallet) {
      setUpdating(true)
      await execute.increment(connectedWallet, chainID)
      await fetchCount()
    }
  }

  const onClickReset = async () => {
    if (connectedWallet) {
      setUpdating(true)
      await execute.reset(connectedWallet, resetValue, chainID)
      await fetchCount()
    }
  }

  const fetchCount = useCallback(async () => {
    if (connectedWallet) {
      setUpdating(true)
      const { count } : any = await query.getCount(connectedWallet, chainID)
      setCount(count)
      setUpdating(false)
    }
  }, [connectedWallet, chainID])

  return (
    <div className="App">
      <header className="App-header">
        {contractChains.map((chain) => (
          <button style={{ opacity : chainID === chain ? '1 ': '0.5' }} key={chain} type='button' onClick={() =>setChainID(chain)}>
             {chain}
          </button>
          ))}
          {chainID ? 
        <div>
          COUNT: {count} {updating && '(updating ...)'}
          <button onClick={onClickIncrement} type="button">
            +
          </button>
        </div>
        : <div> Please select a chain </div>}
        {status === WalletStatus.WALLET_CONNECTED && (
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
  )
}

export default App