import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { getChainFullName } from '../../utils/WalletHelpers'

import BSC from "../../images/Blockchains/Binance.svg"
import ETH from "../../images/Blockchains/Ethereum.svg"
import AVAX from "../../images/Blockchains/Avalanche.svg"

import ItemList from './ItemList'
import { useWeb3React } from '@web3-react/core'
import { AvalancheChain, BNBChain, ETHChain } from '../../utils/Networks'

const ChainSelector = () => {
	const { chainId } = useWeb3React()

	return (
		<Menu as="div" className="inline-block text-left">
			<Menu.Button className="p-2.5 w-full rounded-md bg-gradient-to-br from-violet to-violetDark font-medium text-white duration-150 hover:scale-95 hover:bg-dark">
				<div className='flex items-center justify-between'>
					<div>
						{getChainFullName(chainId)}
					</div>
					<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
				</div>
			</Menu.Button>

			<Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="origin-top-center absolute center-1 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-darkCard ring-1 ring-black ring-opacity-5 focus:outline-none">
					<ul className='p-1'>
						<li onClick={() => BNBChain()}>
							<ItemList name="Smart Chain" logo={BSC} logoWidth="w-5" color="warning" />
						</li>
						<li onClick={() => ETHChain()}>
							<ItemList name="Ethereum" logo={ETH} logoWidth="w-3" color="info" />
						</li>
						<li onClick={() => AvalancheChain()}>
							<ItemList name="Avalanche" logo={AVAX} logoWidth="w-4" color="error" />
						</li>
					</ul>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}

export default ChainSelector