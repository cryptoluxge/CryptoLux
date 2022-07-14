import React from 'react'
import IFOPool from "../../../components/PancakeSwap/IFO/IFOPool"
import IFOCard from "../../../components/PancakeSwap/IFO/IFOCard"
import IFOTokenDescription from "../../../components/PancakeSwap/IFO/IFOTokenDescription"
import PrivateSaleInfo from "../../../components/PancakeSwap/IFO/PrivateSaleInfo"
import TotalUsers from "../../../components/PancakeSwap/IFO/TotalUsers"

const index = () => {
  return (
    <div className='mt-3'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full ჰ-ა'>
        <div>
          <IFOPool />
          <IFOTokenDescription />
        </div>
        <div className='md:col-span-2'>
          <IFOCard />
        </div>
        <div>
          <PrivateSaleInfo />
          <TotalUsers />
        </div>
      </div>
    </div>
  )
}

export default index