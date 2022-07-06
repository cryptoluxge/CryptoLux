import React from 'react'
import IFOPool from "../../../components/IFO/IFOPool"
import IFOCard from "../../../components/IFO/IFOCard"
import IFOTokenDescription from "../../../components/IFO/IFOTokenDescription"
import PrivateSaleInfo from "../../../components/IFO/PrivateSaleInfo"
import TotalUsers from "../../../components/IFO/TotalUsers"

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