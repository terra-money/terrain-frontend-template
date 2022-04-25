import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import { ConnectWallet } from 'components/ConnectWallet';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
  return (
    <main
      style={{ margin: 20, display: 'flex', flexDirection: 'column', gap: 40 }}
    >
      <ConnectWallet />
    </main>
  );
}

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
