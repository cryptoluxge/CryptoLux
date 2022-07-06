import { getCakeVaultV2, getCakeContract } from "./contractHelpers";
import { contract } from "../../../config/PancakeSwap/constants/contracts";
import moment from "moment";
import BigNumber from "bignumber.js";
import Web3 from "web3";

const cakeVaultContract = getCakeVaultV2();
const web3 = new Web3("https://bsc-dataseed.binance.org");

function convertTimeStamp(startTimestamp, endTimestamp) {
  /* const daysInGeorgian = { Monday: "ორშაბათი", Tuesday: "სამშაბათი", Wednesday: "ოთხშაბათი", Thursday: "ხუთშაბათი", Friday: "პარასკები", Saturday: "შაბათი", Sunday: "კვირა" }; */
  const monthsInGeorgian = { January: "იანვარი", February: "თებერვალი", March: "მარტი", April: "აპრილი", May: "მაისი", June: "ივნისი", July: "ივლისი", August: "აგვისტო", September: "სექტემბერი", October: "ოქტომბერი", December: "დეკემბერი" };

  const lockStarTimestamp = moment(moment.unix(startTimestamp).format("L"));
  const lockEndTimestamp = moment(moment.unix(endTimestamp).format("L"));

  const total = lockEndTimestamp.diff(lockStarTimestamp, "week");

  const year = moment.unix(endTimestamp).format("YYYY");
  const month = moment.unix(endTimestamp).format("MMMM");
  const hour = moment.unix(endTimestamp).format("HH");
  const minute = moment.unix(endTimestamp).format("mm");
  const dayNumber = moment.unix(endTimestamp).format("D");
  const date = `${dayNumber} ${monthsInGeorgian[month]}, ${year} ${hour}:${minute}`;

  return { total, date };
}

export const getVaultUserData = async (account) => {
  const userInfo = await cakeVaultContract.methods.userInfo(account).call();
  const PricePerFullShare = await cakeVaultContract.methods.getPricePerFullShare().call();
  const cakeAmount = (userInfo[0] * PricePerFullShare) / 1e18 - userInfo[6];
  const cakeAmount1 = new BigNumber(cakeAmount).div(new BigNumber(10).pow(18)).toNumber();
  const pendingAmount = cakeAmount - userInfo[2];
  const isLocked = userInfo[7];
  if (isLocked) {
    const lockEndTime = convertTimeStamp(userInfo[4], userInfo[5]);
    return { depositedCake: web3.utils.fromWei(String(userInfo[2], "ether")), cakeAmount: web3.utils.fromWei(String(cakeAmount), "ether"), pendingAmount: web3.utils.fromWei(String(pendingAmount), "ether"), isLocked, lockEndTime };
  }
  return { depositedCake: web3.utils.fromWei(String(userInfo[2], "ether")), cakeAmount: String(cakeAmount1), pendingAmount: web3.utils.fromWei(String(pendingAmount), "ether"), isLocked };
};

export const getTotalStakedCake = async () => {
  const totalCakeStaked = await cakeVaultContract.methods.available().call();
  return web3.utils.fromWei(String(totalCakeStaked), "ether");
};

export const getTotalCakeLocked = async () => {
  const totalLockedCake = await cakeVaultContract.methods.totalLockedAmount().call();
  return web3.utils.fromWei(String(totalLockedCake), "ether");
};

export const getCakeVaultV2IsApproved = async (account) => {
  const CAKEContract = getCakeContract();
  const isApproved = await CAKEContract.methods.allowance(account, contract.cakeVaultV2.contractAddress).call();
  if (Number(isApproved) > 0) {
    return true;
  }
  return false;
};

export const getUserCakeBalance = async (account) => {
  const cakeContract = getCakeContract(56)
  const userBalance = await cakeContract.methods.balanceOf(account).call()
  return web3.utils.fromWei(userBalance, "ether");
}