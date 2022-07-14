import React from 'react'
import Buttons from './Buttons'

const Staked = ({ name, poolContract, stakedCake }) => {
  return (
    <div>
      <div className='p-3 border-2 border-indigo-200 dark:border-zinc-500 w-full md:w-[280px] rounded-lg'>
        <p className='text-lightText dark:text-darkText'>დასტეიკებული CAKE</p>
        <div className='flex items-center justify-between mt-4 md:mt-15'>
          <p className='text-lightText dark:text-darkText'>{stakedCake}</p>
          <Buttons poolContract={poolContract} name={name} />
        </div>
      </div>
    </div>
  )
}

export default Staked