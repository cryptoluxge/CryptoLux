import { useState, useEffect, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { getPancakeProfileContract } from "../../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers";

const useSquadNFT = () => {
  const mountedRef = useRef(true);
  const { account, active, chainId } = useWeb3React();
  const [isSquad, setIsSquad] = useState(Boolean);
  async function check() {
    const pancakeProfileContract = getPancakeProfileContract(chainId);
    const getProfile = await pancakeProfileContract.methods.getUserProfile(account).call();
    if (getProfile[3] === "0x0a8901b0E25DEb55A87524f0cC164E9644020EBA") {
      setIsSquad(true);
    } else {
      setIsSquad(false);
    }
  }

  useEffect(() => {
    if (active === true && account.length > 0 && chainId === 56) {
      check();
    }
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line
  }, [account, active]);

  return isSquad;
};

export default useSquadNFT;