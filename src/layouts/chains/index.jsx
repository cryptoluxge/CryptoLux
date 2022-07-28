import React from 'react'
import ChainCard from "../../components/Cards/ChainCard"
import { networks } from './BlockchainList'

const Index = () => {

  return (
    <div className='mt-5'>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 w-full'>
        {networks.map((x) => <ChainCard key={x.chainId} name={x.name} logo={x.logo} symbol={x.symbol} chainId={x.chainId} action={x.action} />)}
      </div>
    </div>
  )
}

export default Index