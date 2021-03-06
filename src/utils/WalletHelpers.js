import Web3 from "web3"
import { getSimpleCoinPrice } from "./APIs/CoinGeckoAPI";
import BSC from "../images/Blockchains/Binance.svg"
import ETH from "../images/Blockchains/Ethereum.svg"
import AVAX from "../images/Blockchains/Avalanche.svg"

const web3 = new Web3(window.ethereum);

const web3BSC = new Web3('https://bsc-dataseed1.binance.org/');
const web3ETH = new Web3('https://rpc.ankr.com/eth');
const web3AVAX = new Web3('https://api.avax.network/ext/bc/C/rpc');

const explorerURLS = {
  56: "https://bscscan.com",
  1: "https://etherscan.io",
  43114: "https://snowtrace.io",
  137: "https://polygonscan.com",
  250: "https://ftmscan.com",
  2001: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com",
};

export const getChainName = (chainId) => {
  // eslint-disable-next-line
  switch (chainId) {
    case 1:
      return "ETH"
    case 56:
      return "BSC"
    case 43114:
      return "AVAX"
    default:
      return "Wrong Network"
  }
}

export const getChainFullName = (chainId) => {
  // eslint-disable-next-line
  switch (chainId) {
    case 1:
      return <div className="flex flex-row items-center gap-2">
        <img src={ETH} alt='eth' className='w-3' />
        <p className="font-semibold text-sm hidden md:flex">Ethereum</p>
        <p className="font-semibold text-sm flex md:hidden">ETH</p>
      </div>
    case 56:
      return <div className="flex flex-row items-center gap-2">
        <img src={BSC} alt='bsc' className='w-4' />
        <p className="font-semibold text-sm hidden md:flex">Smart Chain</p>
        <p className="font-semibold text-sm flex md:hidden">BSC</p>
      </div>
    case 43114:
      return <div className="flex flex-row items-center gap-2">
        <img src={AVAX} alt='avax' className='w-4' />
        <p className="font-semibold text-sm hidden md:flex">Avalanche</p>
        <p className="font-semibold text-sm flex md:hidden">AVAX</p>
      </div>
  }
}

export const shortAddress = (address, length) => {
  try {
    return `${address.substring(0, length)}...${address.substring(address.length - length)}`;
  } catch {
    console.log()
  }
}

export const getExplorerURL = (type, data, chain) => {
  switch (type) {
    case "wallet":
      return `${explorerURLS[chain]}/address/${data}`;
    case "tx":
      return `${explorerURLS[chain]}/tx/${data}`;
    case "token":
      return `${explorerURLS[chain]}/token/${data}`;
    case "block":
      return `${explorerURLS[chain]}/block/${data}`;
    default:
      return `${explorerURLS[chain]}/`;
  }
}

export const getNativeBalance = async (account) => {
  const nativeBalance = await web3.eth.getBalance(account);
  return web3.utils.fromWei(nativeBalance, 'ether');
}

export const getBalancesOnSupportedChains = async (account) => {
  const BNBPrice = await getSimpleCoinPrice('binancecoin')
  const ETHPrice = await getSimpleCoinPrice('ethereum')
  const AVAXPrice = await getSimpleCoinPrice('avalanche-2')

  const balanceBSC = await web3BSC.eth.getBalance(account);
  const balanceETH = await web3ETH.eth.getBalance(account);
  const balanceAVAX = await web3AVAX.eth.getBalance(account);

  return {
    bsc: { bal: web3BSC.utils.fromWei(balanceBSC, 'ether'), usd: Number(BNBPrice) * Number(web3BSC.utils.fromWei(balanceBSC, 'ether')) },
    eth: { bal: web3ETH.utils.fromWei(balanceETH, 'ether'), usd: Number(ETHPrice) * Number(web3ETH.utils.fromWei(balanceETH, 'ether')) },
    avax: { bal: web3AVAX.utils.fromWei(balanceAVAX, "ether"), usd: Number(AVAXPrice) * Number(web3AVAX.utils.fromWei(balanceAVAX, "ether")) }
  }
}