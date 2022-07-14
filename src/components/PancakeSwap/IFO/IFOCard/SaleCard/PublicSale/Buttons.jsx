import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useBlockNumber from "../../../../../../hooks/useBlocknumber"
import { AiFillWarning } from 'react-icons/ai'
import ApproveIFO from '../Buttons/ApproveIFO'
import DepositCAKE from '../Buttons/DepositCAKE'
import HarvestTokens from '../Buttons/HarvestTokens'
import ConnectButton from "../../../../../../components/ConnectWallet/ConnectButton"
import ChangeNetwork from "../../../../../../components/ConnectWallet/WrongNetwork"
import { getCakeContract } from '../../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers';
import { ifo } from '../../../../../../config/PancakeSwap/constants/ifo'
import { getVaultUserData } from '../../../../../../utils/BNBChain/PancakeSwapHelpers/Helpers'

const Buttons = () => {
  const [currentBlockNumber] = useBlockNumber();
  const { account, active, chainId } = useWeb3React()
  const [isApproved, setIsApproved] = useState()
  const [userData, setUserData] = useState([])
  const cakeContract = getCakeContract(chainId);

  async function checkApprove() {
    const userCakeData = await getVaultUserData(account)
    setUserData(userCakeData)
    console.log(userCakeData)
    const getApprove = await cakeContract.methods.allowance(account, ifo.poolContract).call();
    if (getApprove > 0) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      checkApprove();
    }
    // eslint-disable-next-line
  }, [chainId, active]);

  return (
    <div>
      {active ? (
        <div>
          {chainId === 56 ? (
            <div>
              {userData.isLocked ? (
                <div>
                  {isApproved ? (
                    <div>
                      {currentBlockNumber >= ifo.startBlock && currentBlockNumber <= ifo.endBlock ? <DepositCAKE poolType="public" /> : null}
                      {currentBlockNumber > ifo.endBlock ? <HarvestTokens poolType={1} /> : null}
                    </div>
                  ) : (
                    <ApproveIFO />
                  )}
                </div>
              ) : (
                <div className='bg-red-100 rounded-lg p-2 flex items-start gap-2 border-[1px] border-red-500 shadow-md'>
                  <AiFillWarning className='text-2xl text-red-500' />
                  <p className='text-lightText text-sm w-full font-semibold'>თქვენ არ გაქვთ iCAKE-ი IFO-ს Public SALE-ში გამოსაყენებლად.</p>
                </div>
              )}
            </div>
          ) : (
            <div className='flex justify-center'>
              <ChangeNetwork changeTo="BSC" text="გადართე BSC ქსელზე" />
            </div>
          )}
        </div>
      ) : (
        <div className='flex justify-center'>
          <ConnectButton loginText="დააკავშირე საფულე" />
        </div>
      )}
    </div>
  )
}

export default Buttons