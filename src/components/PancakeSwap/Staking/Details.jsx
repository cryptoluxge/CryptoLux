import React from 'react'
import { MdOpenInNew } from 'react-icons/md'

const Details = ({ rewardPerBlock, tokenName, poolAddress, website }) => {
  return (
    <div className='p-3 w-full md:w-[250px] rounded-lg gap-1 border-2 border-indigo-200 dark:border-zinc-500'>
      <div className='flex justify-between'>
        <p className='text-lightText dark:text-darkText'>APY:</p>
        <p className='text-lightText dark:text-darkText'>100%</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-lightText dark:text-darkText'>დამთავრდება:</p>
        <p className='text-lightText dark:text-darkText'>7 დღეში</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-lightText dark:text-darkText'>ბლოკში:</p>
        <p className='text-lightText dark:text-darkText'>{rewardPerBlock} {tokenName}</p>
      </div>
      <div className='flex justify-between'>
        <p className='text-lightText dark:text-darkText'>Total Staked:</p>
        <p className='text-lightText dark:text-darkText'>2,057,876 CAKE</p>
      </div>

      <div className='flex flex-col gap-1 mt-3'>
        <div className='flex items-center gap-1'>
          <a href={`https://bscscan.com/address/${poolAddress}`} className='text-lightText dark:text-darkText text-sm font-semibold'>ნახე კონტრაქტი</a>
          <MdOpenInNew className='text-primary' />
        </div>
        <div className='flex items-center gap-1'>
          <a href={website} className='text-lightText dark:text-darkText text-sm font-semibold'>პროექტის ვებ-გვერდი</a>
          <MdOpenInNew className='text-primary' />
        </div>
      </div>
    </div>
  )
}

export default Details