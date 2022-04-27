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

const App = () => {
  const [count, setCount] = useState(null)
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()

  const connectedWallet = useConnectedWallet()

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        const { count } : any = await query.getCount(connectedWallet)
        setCount(count) 
      }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const onClickIncrement = async () => {
    if (connectedWallet) {
      setUpdating(true)
      await execute.increment(connectedWallet)
      const { count } : any = await query.getCount(connectedWallet)
      setCount(count)
      setUpdating(false)
    }
  }

  const onClickReset = async () => {
    if (connectedWallet) {
      setUpdating(true)
      console.log(resetValue)
      await execute.reset(connectedWallet, resetValue)
      const { count } : any = await query.getCount(connectedWallet)
      setCount(count)
      setUpdating(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
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
      <ConnectWallet />
    </div>
  )
}

export default App
