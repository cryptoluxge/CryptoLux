import { useState, useEffect } from "react";
import { contract } from "../../../config/PancakeSwap/constants/contracts";
import { getPancakeSquadContract } from "../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers";

const useSquad = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getSquads = async () => {
      const SquadNFTContract = getPancakeSquadContract();
      const getSquadNumber = await SquadNFTContract.methods.balanceOf(contract.pancakeProfile.contractAddress).call();
      setData(getSquadNumber);
    }
    getSquads()
    // eslint-disable-next-line
  }, []);

  return data;
};

export default useSquad;