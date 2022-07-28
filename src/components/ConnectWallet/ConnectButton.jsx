import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import MetamaskIcon from "../../images/WalletIcons/MetamaskIcon.svg"
import TrustWalletIcon from "../../images/WalletIcons/TrustWalletIcon.svg"
import WalletItem from './WalletItem'
import { injected } from "./connectors"
import { useWeb3React } from '@web3-react/core'
import { useToast } from '../../hooks/useToast'

export default function Modal({ text }) {
	const { activate } = useWeb3React()
	const [open, setOpen] = useState(false)
	const cancelButtonRef = useRef(null)
	const toast = useToast()
	const provider = window.ethereum;

	async function connect() {
		try {
			if (typeof provider !== "undefined") {
				await activate(injected);
				localStorage.setItem("isWalletConnected", true);
			} else {
				toast('error', 'საფულის დასაკავშირებლად საჭიროა Metamask!')
			}
		} catch (ex) {
			console.log("ERROR", ex);
		}
	}

	return (
		<div>
			<button onClick={() => setOpen(true)}
				type="button" className="duration-150 hover:scale-95 text-white bg-gradient-to-br from-violet to-violetDark rounded-lg text-sm font-medium px-3 py-2.5 text-center inline-flex items-center">
				<svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
				{text ? text : 'შესვლა'}
			</button>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
					<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 bg-darkCard bg-opacity-75 transition-opacity" />
					</Transition.Child>
					<div className="fixed z-10 inset-0">
						<div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
							<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
								<Dialog.Panel className="relative rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
									<div className="relative shadow bg-lightModal dark:bg-darkModal">
										<button onClick={() => setOpen(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="crypto-modal">
											<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
										</button>
										<div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
											<h3 className="text-lightText dark:text-darkText font-semibold">
												საფულის დაკავშირება
											</h3>
										</div>
										<div className="p-6">
											<p className="text-sm font-semibold text-gray-500 dark:text-darkText">დაუკავშირდით თქვენი საფულით ან შექმენით ახალი.</p>
											<ul className="my-4 space-y-3">
												<div onClick={() => connect()}>
													<WalletItem name="Metamask" icon={MetamaskIcon} />
												</div>
												<div onClick={() => connect()}>
													<WalletItem name="Trust Wallet" icon={TrustWalletIcon} />
												</div>
											</ul>
											<div>
												<a href="#/" className="inline-flex items-center text-xs font-semibold text-gray-500 hover:underline dark:text-gray-400">
													<svg className="mr-2 w-3 h-3" aria-hidden="true" focusable="false" data-prefix="far" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
													რატომ მჭირდება საფულის დაკავშირება?</a>
											</div>
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