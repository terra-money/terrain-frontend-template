import './App.css'
import { useEffect, useState, useMemo } from 'react'
import {
  useWallet,
  useConnectedWallet,
  useLCDClient,
  WalletStatus,
} from '@terra-money/wallet-provider'
import { contractAdress } from './contract/address'
import { {{client-name}} } from './contract/clients/{{client-name}}'
import { ConnectWallet } from './components/ConnectWallet'

const App = () => {
  const [count, setCount] = useState(0)
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()
  const connectedWallet = useConnectedWallet()
  const lcd = useLCDClient()

  const contractClient = useMemo(() => {
    if (!connectedWallet) {
      return;
    }
    return new {{client-name}}(lcd, connectedWallet, contractAdress('{{project-name}}', connectedWallet));
  }, [lcd, connectedWallet]);

  useEffect(() => {
    const prefetch = async () => {
      if (contractClient) {
        const { count } = await contractClient.getCount();
        setCount(count) 
      }
      setUpdating(false)
    }
    prefetch()
  }, [contractClient])

  const onClickIncrement = async () => {
    if (contractClient) {
      setUpdating(true)
      await contractClient.increment();  
      const { count } = await contractClient.getCount();
      setCount(count)
      setUpdating(false)
    }
  }

  const onClickReset = async () => {
    if (contractClient) {
      setUpdating(true)
      await contractClient.reset({ count: resetValue });
      const { count } = await contractClient.getCount();
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
