import { BLOCKS_PER_YEAR, CAKE_PER_YEAR } from "config/PancakeSwap";
import lpAprs from "config/PancakeSwap/constants/lpAprs.json";
import BigNumber from "bignumber.js";

export const getPoolApr = (stakingTokenPrice, rewardTokenPrice, totalStaked, tokenPerBlock) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR);
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked);
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apr.toNumber();
};

export const getFarmApr = (poolWeight, cakePriceUsd, poolLiquidityUsd, lpAddress) => {
  const yearlyCakeRewardAllocation = new BigNumber(poolWeight).times(CAKE_PER_YEAR);
  const cakeRewardsApr = new BigNumber(yearlyCakeRewardAllocation).times(cakePriceUsd).div(poolLiquidityUsd).times(100);
  const lpRewardsApr = lpAprs[lpAddress.toLocaleLowerCase()];
  const apr = Number(lpRewardsApr) + Number(cakeRewardsApr);
  return apr;
};
