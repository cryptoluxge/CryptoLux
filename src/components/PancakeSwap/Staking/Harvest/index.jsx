import React from 'react'
import HarvestButton from './HarvestButton'

const Harvest = ({ tokenName, pendingReward, poolAddress }) => {

  return (
    <div>
      <div className='p-3 border-2 border-indigo-200 dark:border-zinc-500 w-full md:w-[300px] rounded-lg'>
        <p className='text-lightText dark:text-darkText'>დაგროვებული {tokenName}</p>
        <div className='flex items-center justify-between mt-4 md:mt-15'>
          <p className='text-lightText dark:text-darkText'>{pendingReward}</p>
          <HarvestButton poolAddress={poolAddress} name={tokenName} />
        </div>
      </div>
    </div>
  )
}

export default Harvest