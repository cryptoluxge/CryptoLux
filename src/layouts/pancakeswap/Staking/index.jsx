import React from 'react'
import StakingCard from '../../../components/PancakeSwap/Staking'
import { syrupPools } from '../../../config/PancakeSwap/SyrupPools'

const index = () => {
  return (
    <div className='mt-5 flex justify-center'>
      <div className='flex flex-col'>
        {syrupPools.map((x) => (
          <StakingCard key={x.id} tokenName={x.symbol} tokenAddress={x.tokenContractAddress} poolAddress={x.poolContractAddress} website={x.website} rewardPerBlock={x.rewardPerBlock} />
        ))}
      </div>
    </div>
  )
}

export default index