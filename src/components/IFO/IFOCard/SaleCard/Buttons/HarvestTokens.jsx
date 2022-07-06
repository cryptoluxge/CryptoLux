import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { ifo } from '../../../../../config/PancakeSwap/constants/ifo';
import { getIfoPoolContract } from '../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers';

const HarvestTokens = ({ poolType }) => {
  const { account, chainId } = useWeb3React();
  const IFOContract = getIfoPoolContract(ifo.poolContract, chainId);

  async function harvestTokens() {
    await IFOContract.methods.harvestPool(poolType).send({ from: account });
  }

  return (
    <div>
      <button onClick={() => harvestTokens()} className='bg-gradient-to-br from-violet to-violetDark rounded-md px-5 py-1 w-full text-white duration-150 hover:scale-105'>
        გამოტანა
      </button>
    </div>
  )
}

export default HarvestTokens