import React from 'react'
import Card from '../../../Cards/Card'
import PublicSale from "./SaleCard/PublicSale"
import PrivateSale from "./SaleCard/PrivateSale"
import AutomaticIFO from "./AutomaticIFO"
import Timer from './Timer'
import { ifo } from '../../../../config/PancakeSwap/constants/ifo'

const index = () => {
  return (
    <div>
      <Card className="">
        <div>
          <img src={ifo.ifoBanner} alt="" className='rounded-t-lg w-full' />
        </div>
        <Timer />
        <div className='grid grid-row-2 md:grid-cols-2 gap-5 p-3'>
          <PublicSale />
          <PrivateSale />
        </div>
        <AutomaticIFO />
      </Card>
    </div>
  )
}

export default index