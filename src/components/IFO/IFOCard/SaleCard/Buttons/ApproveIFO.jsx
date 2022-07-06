import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { ifo } from '../../../../../config/PancakeSwap/constants/ifo';
import { getCakeContract } from '../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers';

const ApproveIFO = () => {
  const { account, chainId } = useWeb3React();
  const cakeContract = getCakeContract(chainId);

  async function handleApprove() {
    await cakeContract.methods
      .approve(ifo.poolContract, "115792089237316195423570985008687907853269984665640564039457584007913129639935")
      .send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`მუშავდება: თქვენი ტრანზაქცია გაიგზავნა: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          console.log("Transaction rejected by user: თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          console.log("Transaction rejected: თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          console.log("intrinsic gas too low: საკომისიო ძალიან დაბალია.");
        }
      });
  }

  return (
    <div>
      <button onClick={() => handleApprove()} className='bg-gradient-to-br from-violet to-violetDark rounded-md px-5 py-1 w-full text-white duration-150 hover:scale-105'>
        Enable
      </button>
    </div>
  )
}

export default ApproveIFO