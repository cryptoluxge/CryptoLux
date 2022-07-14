import React from 'react'
import { ifo } from '../../../../config/PancakeSwap/constants/ifo'
import getBlockNumber from "../../../../hooks/useBlocknumber"

const Timer = () => {
  const [currentBlockNumber] = getBlockNumber();
  return (
    <div className='bg-gradient-to-br from-violet to-violetDark text-white font-semibold flex justify-center py-2'>
      {currentBlockNumber < ifo.startBlock ? `დაწყებამდე დარჩა ${ifo.startBlock - currentBlockNumber} ბლოკი` : null}
      {currentBlockNumber >= ifo.startBlock && currentBlockNumber <= ifo.endBlock ? `დამთავრებამდე დარჩა ${ifo.endBlock - currentBlockNumber} ბლოკი` : null}
      {currentBlockNumber >= ifo.endBlock ? `დამთავრდა` : null}
    </div>
  )
}

export default Timer