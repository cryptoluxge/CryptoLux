import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { getExplorerURL } from '../../../utils/WalletHelpers'

const ItemList = ({ name, symbol, balance, tokenAddress }) => {
	const { chainId } = useWeb3React()
	return (
		<div>
			<div className='flex items-center hover:bg-indigo-100 dark:hover:bg-darkBackground rounded-lg p-1'>
				<div className='w-[35px] h-[32px] rounded-full bg-gray-300 flex items-center justify-center'>Z</div>
				<table className='table-fixed w-full border-collapse text-lightText dark:text-darkText ml-2'>
					<thead>
						<tr>
							<th className='text-left font-light'>სახელი</th>
							<th className='text-left font-light'>სიმბოლო</th>
							<th className='text-left font-light'>ბალანსი</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='text-left font-semibold'>
								<a href={getExplorerURL("token", tokenAddress, chainId)} target="_blank" rel="noreferrer" >{name}</a>
							</td>
							<td className='text-left font-semibold'>
								<a href={getExplorerURL("token", tokenAddress, chainId)} target="_blank" rel="noreferrer" >{symbol}</a>
							</td>
							<td className='text-left font-semibold'>{Number(balance).toLocaleString("en-US")}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='border-[1px] border-gray-200 dark:border-gray-500'></div>
		</div>
	)
}

export default ItemList