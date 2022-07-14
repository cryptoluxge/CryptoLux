import React, { useEffect, useRef } from 'react'
import { useWeb3React } from '@web3-react/core';
import { getIfoPoolContract, getBep20TokenContract, getSwapContract, getCakeContract } from '../../../../../utils/BNBChain/PancakeSwapHelpers/contractHelpers';
import { ifo } from '../../../../../config/PancakeSwap/constants/ifo';
import Web3 from 'web3';

const Index = () => {
  const mountedRef = useRef(true);
  const { active, account, chainId } = useWeb3React()
  const web3 = new Web3(window.ethereum);
  const offeringTokenIFOPoolContract = getIfoPoolContract(ifo.poolContract, chainId);
  const lpContract = getCakeContract();

  const autoWithdraw = async (poolType) => {
    await offeringTokenIFOPoolContract.methods.harvestPool(poolType).send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`თქვენი ტრანზაქცია მუშავდება: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
          console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
          console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
        } else {
          /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
          console.log("არ დადასტურდა");
        }
      })
      .then((receipt) => {
        if (receipt.status === true) {
          console.log("თქვენი ტრანზაქცია დადასტურდა!");
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
      });
  }

  const autoDeposit = async (poolType) => {
    const userCakeBalance = await lpContract.methods.balanceOf(account).call()
    await offeringTokenIFOPoolContract.methods.depositPool(userCakeBalance, poolType).send({ from: account })
      .once("transactionHash", (hash) => {
        console.log(`თქვენი ტრანზაქცია მუშავდება: ${hash}`);
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        if (error.code === 4001) {
          /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
          console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
        } else if (error.code === -32003) {
          /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
          console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
        } else if (error.code === -32603) {
          /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
        } else {
          /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
          console.log("არ დადასტურდა");
        }
      })
      .then((receipt) => {
        if (receipt.status === true) {
          console.log("თქვენი ტრანზაქცია დადასტურდა!");
        } else {
          console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        }
      });
  }

  async function autoSell() {
    const botTimer = setInterval(async () => {
      const offeringTokenContract = getBep20TokenContract(ifo.tokenDetails.address, chainId);
      const swapContract = getSwapContract(chainId);
      const tokenBalance = await offeringTokenContract.methods.balanceOf(account).call();
      if (tokenBalance > 0) {
        clearInterval(botTimer);
        const amountIn = tokenBalance;
        const amountOutMin = 0;
        const path = [ifo.tokenDetails.address, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"];
        const toAddress = account;
        const deadline = Date.now() + 100000;

        await swapContract.methods
          .swapExactTokensForETH(amountIn, amountOutMin, path, toAddress, deadline)
          .send({ from: account })
          .on("error", (error) => {
            console.log("Error: ", error);
            if (error.code === 4001) {
              /* showNotification("Transaction rejected by user", "თქვენ ტრანზაქცია არ დაადასტურეთ.", "danger"); */
              console.log("თქვენ ტრანზაქცია არ დაადასტურეთ.");
            } else if (error.code === -32003) {
              /* showNotification("Transaction rejected", "თქვენი ტრანზაქცია არ დადასტურდა.", "danger"); */
              console.log("თქვენი ტრანზაქცია არ დადასტურდა.");
            } else if (error.code === -32603) {
              /* showNotification("intrinsic gas too low", "საკომისიო ძალიან დაბალია.", "danger"); */
            } else {
              /* showNotification("შეცდომა", "არ დადასტურდა", "danger"); */
              console.log("არ დადასტურდა");
            }
          })
          .then((receipt) => {
            console.log("LAST CALLBACK: ", receipt);
            if (receipt.status === true) {
              /* showNotification("დადასტურდა", "გაიყიდა", "success"); */
              console.log("გაიყიდა");
              document.getElementById("autoWithdrawAndSellInPublic").checked = false;
              document.getElementById("autoWithdrawAndSellInPrivate").checked = false;
            } else {
              console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
            }
          });
      }
    }, 1000);
  }

  async function AutoFunction() {
    /* 0 Private 1 Public */
    const botTimer = setInterval(async () => {
      const bn = await web3.eth.getBlockNumber();
      const autoDepositInPublic = document.getElementById("autoDepositInPublic").checked;
      const autoWithdrawInPublic = document.getElementById("autoWithdrawInPublic").checked;
      const autoWithdrawAndSellInPublic = document.getElementById("autoWithdrawAndSellInPublic").checked;
      const autoDepositInPrivate = document.getElementById("autoDepositInPrivate").checked;
      const autoWithdrawInPrivate = document.getElementById("autoWithdrawInPrivate").checked;
      const autoWithdrawAndSellInPrivate = document.getElementById("autoWithdrawAndSellInPrivate").checked;

      if (bn >= ifo.endBlock) {
        if (autoWithdrawInPublic === true) {
          clearInterval(botTimer);
          document.getElementById("autoWithdrawInPublic").checked = false;
          await autoWithdraw(1);
        }

        if (autoWithdrawAndSellInPublic === true) {
          clearInterval(botTimer);
          document.getElementById("autoWithdrawAndSellInPublic").checked = false;
          await autoWithdraw(1);
          await autoSell();
        }

        if (autoWithdrawInPrivate === true) {
          clearInterval(botTimer);
          document.getElementById("autoWithdrawInPrivate").checked = false;
          await autoWithdraw(0);
        }

        if (autoWithdrawAndSellInPrivate === true) {
          clearInterval(botTimer);
          document.getElementById("autoWithdrawAndSellInPrivate").checked = false;
          await autoWithdraw(0);
          await autoSell();
        }
      }

      if (bn > ifo.startBlock && bn < ifo.endBlock) {
        if (autoDepositInPublic === true) {
          //  ეგრევე შეტანა პაბლიკში
          document.getElementById("autoDepositInPublic").checked = false;
          await autoDeposit(1)
        }

        if (autoDepositInPrivate === true) {
          //  ეგრევე შეტანა პრივატეში
          document.getElementById("autoDepositInPrivate").checked = false;
          await autoDeposit(0)
        }
      }
    }, 3000);
  }

  function checkBoxState(e) {
    console.log(e.target.id);
    console.log("Changed!");
  }

  useEffect(() => {
    if (active === true && chainId === 56) {
      AutoFunction();
    }
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line
  }, [active, chainId]);

  return (
    <div className='p-3 space-y-2'>
      <div className="flex items-center">
        <input onChange={(e) => checkBoxState(e)} id="autoDepositInPublic" type="checkbox" value="" className="w-4 h-4 text-primary bg-primary rounded-full" />
        <label className="ml-2 text-sm font-semibold text-lightText dark:text-darkText">რომ დაიწყება შემატანინე (PUBLIC SALE)</label>
      </div>
      <div className="flex items-center">
        <input onChange={(e) => checkBoxState(e)} id="autoWithdrawInPublic" type="checkbox" value="" className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="ml-2 text-sm font-semibold text-lightText dark:text-darkText">რომ მორჩება გამომატანინე (PUBLIC SALE)</label>
      </div>
      <div className="flex items-center">
        <input onChange={(e) => checkBoxState(e)} id="autoWithdrawAndSellInPublic" type="checkbox" value="" className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="ml-2 text-sm font-semibold text-lightText dark:text-darkText">რომ მორჩება გამომატანინე და გამაყიდინე (PUBLIC SALE)</label>
      </div>
      <div className="flex items-center">
        <input onChange={(e) => checkBoxState(e)} id="autoDepositInPrivate" type="checkbox" value="" className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="ml-2 text-sm font-semibold text-lightText dark:text-darkText">რომ დაიწყება შემატანინე (PRIVATE SALE)</label>
      </div>
      <div className="flex items-center">
        <input onChange={(e) => checkBoxState(e)} id="autoWithdrawInPrivate" type="checkbox" value="" className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="ml-2 text-sm font-semibold text-lightText dark:text-darkText">რომ მორჩება გამომატანინე (PRIVATE SALE)</label>
      </div>
      <div className="flex items-center">
        <input onChange={(e) => checkBoxState(e)} id="autoWithdrawAndSellInPrivate" type="checkbox" value="" className="w-4 h-4 text-primary bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="ml-2 text-sm font-semibold text-lightText dark:text-darkText">რომ მორჩება გამომატანინე და გამაყიდინე (PRIVATE SALE)</label>
      </div>
    </div>
  )
}

export default Index