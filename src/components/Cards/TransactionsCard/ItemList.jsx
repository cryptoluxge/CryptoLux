import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { getExplorerURL, shortAddress } from '../../../utils/WalletHelpers'
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs"
const ItemList = ({ toAddress, fromAddress, txHash }) => {
	const { account, chainId } = useWeb3React()
	return (
		<div className=''>
			<div className='flex items-center hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-1'>
				{fromAddress === account.toLowerCase() ? <BsFillArrowUpCircleFill className="text-2xl text-red-500" /> : <BsFillArrowDownCircleFill className="text-2xl text-green-500" />}
				<table className='table-fixed w-full border-collapse text-lightText dark:text-darkText ml-2'>
					<thead>
						<tr>
							<th className='text-left font-light'>საიდან</th>
							<th className='text-left font-light'>სად</th>
							<th className='text-left font-light'>ჰეში</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='text-left'>
								<a href={getExplorerURL("wallet", fromAddress, chainId)} target="_blank" rel="noreferrer" className='text-sm font-semibold'>{fromAddress === account.toLowerCase() ? "ჩემიდან" : shortAddress(fromAddress, 3)}</a>
							</td>
							<td className='text-left'>
								<a href={getExplorerURL("wallet", toAddress, chainId)} target="_blank" rel="noreferrer" className='text-sm font-semibold'>{toAddress === account.toLowerCase() ? "ჩემთან" : shortAddress(toAddress, 3)}</a>
							</td>
							<td className='text-left'>
								<a href={getExplorerURL("tx", txHash, chainId)} target="_blank" rel="noreferrer" className='text-sm font-semibold'>{(shortAddress(txHash, 5))}</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='border-[1px] border-gray-200 dark:border-gray-500'></div>
		</div>
	)
}

export default ItemList