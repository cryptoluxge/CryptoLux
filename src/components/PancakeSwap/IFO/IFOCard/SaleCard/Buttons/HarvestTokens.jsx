import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { ifo } from '../../../../../../config/PancakeSwap/constants/ifo';
import { getIfoPoolContract } from '../../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers';
import { useToast } from '../../../../../../hooks/useToast';
import { shortAddress } from '../../../../../../utils/WalletHelpers';

const HarvestTokens = ({ poolType }) => {
  const { account, chainId } = useWeb3React();
  const IFOContract = getIfoPoolContract(ifo.poolContract, chainId);
  const toast = useToast()

  async function harvestTokens() {
    await IFOContract.methods.harvestPool(poolType).send({ from: account })
      .once("transactionHash", (hash) => {
        toast('loading', 'თქვენი ტრანზაქცია მუშავდება', `${shortAddress(hash, 5)}`)
      })
      .on("error", (error) => {
        if (error.code === 4001) {
          toast('error', 'თქვენ ტრანზაქცია არ დაადასტურეთ')
        } else if (error.code === -32003) {
          toast('error', 'თქვენი ტრანზაქცია არ დადასტურდა')
        } else if (error.code === -32603) {
          toast('error', 'საკომისიო ძალიან დაბალია.')
        } else {
          toast('error', 'შეცდომა', 'ცადეთ თავიდან')
        }
      }).then((receipt) => {
        if (receipt.status === true) {
          toast('success', 'ტრანზაქცია დადასტურდა')
        } else {
          toast('error', 'ტრანზაქცია არ დადასტურდა')
        }
      });
  }

  return (
    <div>
      <button onClick={() => harvestTokens()} className='bg-gradient-to-br from-violet to-violetDark rounded-md px-5 py-1 w-full text-white duration-150 hover:scale-95'>
        გამოტანა
      </button>
    </div>
  )
}

export default HarvestTokens