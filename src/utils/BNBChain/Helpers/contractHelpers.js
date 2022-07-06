// კონტრაქტის მისამართები
import { contract } from "config/BNBChain/constants/contracts";

// კონტრაქტების ABI
import wBNBAbi from "config/BNBChain/abi/wbnbAbi.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = chainId === 56 ? window.ethereum : "https://bsc-dataseed.binance.org";
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getWBNBContract = (chainId) => {
  return getContract(wBNBAbi, contract.wBNB.contractAddress, chainId);
};
