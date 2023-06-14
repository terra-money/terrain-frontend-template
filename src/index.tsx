import { getInitialConfig, WalletProvider } from "@terra-money/wallet-kit";
import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";

getInitialConfig().then((config) => {
  ReactDOM.render(
    <WalletProvider defaultNetworks={config}>
      <App />
    </WalletProvider>,
    document.getElementById("root")
  );
});
