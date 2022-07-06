import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FiExternalLink } from "react-icons/fi"
import { useWeb3React } from '@web3-react/core'
import { getChainName, getExplorerURL, shortAddress } from '../../utils/WalletHelpers'
import ChainSelector from "../ChainSelector";

export default function Modal() {
	const { account, deactivate, chainId } = useWeb3React()
	const [open, setOpen] = useState(false)

	function refreshPage() {
		window.location.reload();
	}

	async function disconnect() {
		try {
			deactivate();
			localStorage.setItem("isWalletConnected", false);
			refreshPage();
		} catch (ex) {
			console.log(ex);
		}
	}

	const cancelButtonRef = useRef(null)
	return (
		<div>
			<div className='flex items-center gap-2'>
				<ChainSelector />
				<button onClick={() => setOpen(true)} type="button" className="font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex bg-gradient-to-br from-violet to-violetDark text-white">
					{shortAddress(account, 5)}
				</button>
			</div>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 bg-darkCard bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="fixed z-10 inset-0">
						<div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
							<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
								<Dialog.Panel className="relative rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full shadow-md dark:shadow-black">
									<div className="relative bg-white rounded-lg dark:bg-darkBackground">
										<div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
											<h3 className="text-base font-semibold text-lightText dark:text-darkText lg:text-xl">
												თქვენი საფულე
											</h3>
										</div>
										<div className="p-3">
											<div className="bg-indigo-100 dark:bg-darkCard w-full rounded-xl p-3">
												<p className="text-md font-semibold text-lightText dark:text-darkText">დაკავშირებულია - {getChainName(chainId)} ქსელით</p>
												<p className="text-lightText dark:text-darkText overflow-auto my-2 bg-white dark:bg-darkBackground rounded-lg p-2">{account}</p>
												<div className="border-[1px] border-white dark:border-stone-700 w-full rounded-full mt-1 "></div>
												<div className="flex justify-between text-lightText dark:text-darkText font-semibold mt-3">
													<a href={getExplorerURL("wallet", account, chainId)} target="_blank" rel="noreferrer" className="flex items-center gap-1 duration-150 cursor-pointer"><FiExternalLink />ნახე Explorer-ზე</a>
												</div>
											</div>
											<button onClick={() => disconnect()} className="bg-red-600 text-white font-semibold w-full rounded-lg py-2 mt-2 duration-150 hover:bg-red-700 border-[1px] border-red-700">გამოსვლა</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
}