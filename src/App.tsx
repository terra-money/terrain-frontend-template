import './App.css'
import { useEffect, useState } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'

import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'
import { getTerraChain, getContractChains } from './contract/utils'
// import { getContractChains } from './contract/address'

const App = () => {
  const connectedWallet = useConnectedWallet()
  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)

  const initChain = getContractChains(connectedWallet)[0]
  const [chainID, setChainID] = useState(initChain)

  const [contractChains, setContractChains] = useState([''])
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()

  useEffect(() => {
    if (connectedWallet) {
      setChainID(getTerraChain(connectedWallet))
      setContractChains(getContractChains(connectedWallet))
    }
  }, [connectedWallet, status])


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
      await execute.increment(connectedWallet)
      await fetchCount()
    }
  }

  const onClickReset = async () => {
    if (connectedWallet) {
      setUpdating(true)
      await execute.reset(connectedWallet, resetValue)
      await fetchCount()
    }
  }

  const fetchCount = async () => {
    if (connectedWallet) {
      const { count } : any = await query.getCount(connectedWallet, chainID)
      setCount(count)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {!!contractChains.length && contractChains.map((chain) => (
          <button style={{ opacity : chainID === chain ? '1 ': '0.5' }} key={chain} type='button' onClick={() =>setChainID(chain)}>
             {chain}
          </button>
          ))}
        <div style={{ display: 'inline' }}>
          COUNT: {count} {updating ? '(updating . . .)' : ''}
          <button onClick={onClickIncrement} type="button">
            {' '}
            +{' '}
          </button>
        </div>
        {status === WalletStatus.WALLET_CONNECTED && (
          <div style={{ display: 'inline' }}>
            <input
              type="number"
              onChange={(e) => setResetValue(+e.target.value)}
              value={resetValue}
            />
            <button onClick={onClickReset} type="button">
              {' '}
              reset{' '}
            </button>
          </div>
        )}
      </header>
      <ConnectWallet chainID={chainID} />
    </div>
  )
}

export default App