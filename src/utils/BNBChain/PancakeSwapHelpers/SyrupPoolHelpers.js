import { getCakeContract, getSyrupPoolContract } from "utils/PancakeSwapHelpers/contractHelpers";
import Web3 from "web3";

const web3 = new Web3("https://bsc-dataseed.binance.org");
const CAKEContract = getCakeContract();

export const getUserStakedCake = async (account, contractAddress) => {
  const SyrupPoolContract = getSyrupPoolContract(contractAddress);
  const staked = await SyrupPoolContract.methods.userInfo(account).call();
  return web3.utils.fromWei(staked[0], "ether");
};

export const getUserPendingToken = async (account, contractAddress) => {
  const SyrupPoolContract = getSyrupPoolContract(contractAddress);
  const pendingRewards = await SyrupPoolContract.methods.pendingReward(account).call();
  return web3.utils.fromWei(pendingRewards, "ether");
};

export const getSyrupPoolIsApproved = async (account, contractAddress) => {
  const isApproved = await CAKEContract.methods.allowance(account, contractAddress).call();
  if (Number(isApproved) > 0) {
    return true;
  }
  return false;
};

export const getSyrupPoolTotalStakedCake = async (contractAddress) => {
  const totalStakedCake = await CAKEContract.methods.balanceOf(contractAddress).call();
  return web3.utils.fromWei(totalStakedCake, "ether");
};

export const getHasUserLimit = async (contractAddress) => {
  const SyrupPoolContract = getSyrupPoolContract(contractAddress);
  const hasUserLimit = await SyrupPoolContract.methods.hasUserLimit().call();
  return hasUserLimit;
};

export const getPoolLimitPerUser = async (contractAddress) => {
  const SyrupPoolContract = getSyrupPoolContract(contractAddress);
  const poolLimitPerUser = await SyrupPoolContract.methods.poolLimitPerUser().call();
  return poolLimitPerUser;
};
