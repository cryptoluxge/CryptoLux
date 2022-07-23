import { useState } from 'react'
import Modal from '../Modal'
import { FiExternalLink, FiCopy } from "react-icons/fi"
/* import { CgProfile } from "react-icons/cg" */
import { useWeb3React } from '@web3-react/core'
import { getExplorerURL, shortAddress } from '../../utils/WalletHelpers'
import ChainSelector from "../ChainSelector";

export default function DisconnectButton() {
	const { account, deactivate, chainId } = useWeb3React()
	const [open, setOpen] = useState(false)

	function refreshPage() {
		window.location.reload();
	}

	async function walletDisconnect() {
		try {
			deactivate();
			localStorage.setItem("isWalletConnected", false);
			refreshPage();
		} catch (ex) {
			console.log(ex);
		}
	}

	return (
		<div>
			<div className='flex items-center gap-2'>
				<ChainSelector />
				<button onClick={() => setOpen(true)} type="button" className="duration-150 hover:scale-95 font-bold uppercase rounded-lg text-sm px-2 py-2.5 text-center inline-flex bg-gradient-to-br from-violet to-violetDark text-white">
					{shortAddress(account, 4)}
				</button>
			</div>
			<Modal title='თქვენი საფულე' open={open} close={() => setOpen(!open)}>
				<div className="px-3">
					<div className="border border-indigo-200 dark:border-gray-400 w-full rounded-xl p-3">
						<p className="text-sm font-semibold text-lightText dark:text-darkText">დაკავშირებულია - METAMASK</p>
						<div className='flex items-center gap-2 py-3'>
							{/* <CgProfile className='text-2xl text-lightText dark:text-darkText' /> */}
							<p className="text-lightText dark:text-darkText font-bold text-sm">{shortAddress(account, 10)}</p>
						</div>
						<div className='flex items-center gap-3'>
							<div className="flex items-center gap-1 text-lightText dark:text-darkText font-semibold">
								<FiExternalLink className='mb-1' />
								<a href={getExplorerURL("wallet", account, chainId)} target="_blank" rel="noreferrer" className="flex items-center gap-1 duration-150 cursor-pointer text-sm">ნახე Explorer-ზე</a>
							</div>
							<div onClick={() => navigator.clipboard.writeText(account)} className="flex items-center gap-1 text-lightText dark:text-darkText font-semibold cursor-pointer">
								<FiCopy className='mb-1' />
								<p className='text-sm text-lightText dark:text-darkText'>კოპირება</p>
							</div>
						</div>
					</div>
					<div className='flex flex-row gap-2 justify-end py-3'>
						<button onClick={() => setOpen(!open)} className="duration-150 rounded-lg text-white p-2  bg-gray-500 hover:bg-gray-700 hover:scale-95 text-sm">დახურვა</button>
						<button onClick={() => walletDisconnect()} className="duration-105 hover:scale-95 bg-red-600 text-white  rounded-lg py-2 duration-150 hover:bg-red-700 border-[1px] border-red-700 px-3 text-sm">გამოსვლა</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}