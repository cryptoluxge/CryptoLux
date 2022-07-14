import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AiFillWarning } from 'react-icons/ai'
import useBlockNumber from "../../../../../../hooks/useBlocknumber"
import ApproveIFO from '../Buttons/ApproveIFO'
import DepositCAKE from '../Buttons/DepositCAKE'
import HarvestTokens from '../Buttons/HarvestTokens'
import checkSquadNFT from "./checkSquadNFT"
import ConnectButton from "../../../../../../components/ConnectWallet/ConnectButton"
import ChangeNetwork from "../../../../../../components/ConnectWallet/WrongNetwork"
import { getCakeContract } from '../../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers';
import { ifo } from '../../../../../../config/PancakeSwap/constants/ifo'

const Buttons = () => {
  const [currentBlockNumber] = useBlockNumber();
  const { account, active, chainId } = useWeb3React()
  const squadNFT = checkSquadNFT();
  const [isApproved, setIsApproved] = useState()
  const cakeContract = getCakeContract(chainId);

  async function checkApprove() {
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
              {squadNFT ? (
                <div>
                  {isApproved ? (
                    <div>
                      {currentBlockNumber >= ifo.startBlock && currentBlockNumber <= ifo.endBlock ? <DepositCAKE poolType="private" /> : null}
                      {currentBlockNumber > ifo.endBlock ? <HarvestTokens poolType={0} /> : null}
                    </div>
                  ) : (<ApproveIFO />)}
                </div>
              ) : (
                <div className='bg-red-100 rounded-lg p-2 flex items-start gap-2 border-[1px] border-red-500 shadow-md'>
                  <AiFillWarning className='text-2xl text-red-500' />
                  <p className='text-lightText text-sm w-full font-semibold'>თქვენ არ გაქვთ PancakeSquad NFT და ვერ მიიღებთ მონაწილეობას Private Sale-ში.</p>
                </div>
              )}
            </div>
          ) : (
            <div className='flex justify-center'>
              <ChangeNetwork changeTo="BSC" text="გადართე BSC ქსელზე" />
            </div>
          )
          }
        </div >
      ) : (
        <div className='flex justify-center'>
          <ConnectButton loginText="დააკავშირე საფულე" />
        </div>
      )}
    </div >
  )
}

export default Buttons