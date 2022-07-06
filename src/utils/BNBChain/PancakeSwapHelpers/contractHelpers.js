// ტოკენები
import { mainnetTokens } from "../../../config/PancakeSwap/constants/tokens";

// კონტრაქტის მისამართები
import { contract } from "../../../config/PancakeSwap/constants/contracts";

// კონტრაქტების ABI
import CakeTokenAbi from "../../../config/PancakeSwap/abi/cakeTokenAbi.json";
import lpContractAbi from "../../../config/PancakeSwap/abi/lpContractAbi.json";
import autoCakePoolAbi from "../../../config/PancakeSwap/abi/autoCakePoolAbi.json";
import manualCakePoolAbi from "../../../config/PancakeSwap/abi/manualCakePoolAbi.json";
import cakeVaultV2Abi from "../../../config/PancakeSwap/abi/cakeVaultV2Abi.json";
import ifoV3Abi from "../../../config/PancakeSwap/abi/ifoV3Abi.json";
import ifoCakePoolAbi from "../../../config/PancakeSwap/abi/ifoCakePoolAbi.json";
import syrupPoolAbi from "../../../config/PancakeSwap/abi/syrupPoolAbi.json";
import pancakeProfileAbi from "../../../config/PancakeSwap/abi/pancakeProfileAbi.json";
import pancakeSquadAbi from "../../../config/PancakeSwap/abi/pancakeSquadAbi.json";
import pancakeBunnyAbi from "../../../config/PancakeSwap/abi/pancakeBunnyAbi.json";
import pcsRouterAbi from "../../../config/PancakeSwap/abi/pcsRouterAbi.json";
import factoryAbi from "../../../config/PancakeSwap/abi/factoryAbi.json";
import bep20Abi from "../../../config/abi/BNBChain/bep20.json";
import masterChefV2Abi from "../../../config/PancakeSwap/abi/masterChefV2Abi.json";
import NFTMarketAbi from "../../../config/PancakeSwap/abi/nftmarketAbi.json";
import Web3 from "web3";

const getContract = (abi, address, chainId) => {
  const signerOrProvider = window.ethereum;
  const web3 = new Web3(signerOrProvider);
  const newContract = new web3.eth.Contract(abi, address);
  return newContract;
};

export const getCakeContract = (chainId) => {
  return getContract(CakeTokenAbi, mainnetTokens.cake.contractAddress, chainId);
};

export const getLpContract = (lpAddresss, chainId) => {
  return getContract(lpContractAbi, lpAddresss, chainId);
};

export const getAutoCakeContract = (chainId) => {
  return getContract(autoCakePoolAbi, contract.cakeVault.contractAddress, chainId);
};

export const getManualCakeContract = (chainId) => {
  return getContract(manualCakePoolAbi, contract.masterChef.contractAddress, chainId);
};

export const getIfoPoolContract = (contractAddress, chainId) => {
  return getContract(ifoV3Abi, contractAddress, chainId);
};

export const getIfoCakePoolContract = (chainId) => {
  return getContract(ifoCakePoolAbi, contract.ifoPool.contractAddress, chainId);
};

export const getSyrupPoolContract = (contractAddress, chainId) => {
  return getContract(syrupPoolAbi, contractAddress, chainId);
};

export const getPancakeProfileContract = (chainId) => {
  return getContract(pancakeProfileAbi, contract.pancakeProfile.contractAddress, chainId);
};

export const getPancakeSquadContract = (chainId) => {
  return getContract(pancakeSquadAbi, contract.pancakeSquad.contractAddress, chainId);
};

export const getPancakeBunnyContract = (chainId) => {
  return getContract(pancakeBunnyAbi, contract.pancakeRabbits.contractAddress, chainId);
};

export const getBep20TokenContract = (tokenContractAddress, chainId) => {
  return getContract(bep20Abi, tokenContractAddress, chainId);
};

export const getSwapContract = (chainId) => {
  return getContract(pcsRouterAbi, contract.router.contractAddress, chainId);
};

export const getFactoryContract = (chainId) => {
  return getContract(factoryAbi, contract.factory.contractAddress, chainId);
};

export const getCakeVaultV2 = (chainId) => {
  return getContract(cakeVaultV2Abi, contract.cakeVaultV2.contractAddress, chainId);
};

export const getMasterChefV2 = (chainId) => {
  return getContract(masterChefV2Abi, contract.masterChefV2.contractAddress, chainId);
};

export const getNFTMarket = (chainId) => {
  return getContract(NFTMarketAbi, contract.NFTMarket.contractAddress, chainId);
};
