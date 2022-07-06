import React from 'react'
import Card from "../Card"

const index = ({ name, chainId, symbol, logo, action }) => {
	return (
		<Card className="p-3">
			<div className='flex items-center space-x-2'>
				<div className='w-[40px] h-[40px] bg-gradient-to-br from-violet to-violetDark rounded-lg shadow-md flex items-center justify-center'>
					<img src={logo} alt={name} className="w-5" />
				</div>
				<div className=''>
					<p className='text-lightText dark:text-darkText font-bold'>{name}</p>
					<p className='text-lightText dark:text-darkText'>Mainnet</p>
				</div>
			</div>
			<div className='py-3'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-lightText dark:text-darkText'>Chain ID</p>
						<p className='text-lightText dark:text-darkText font-bold'>{chainId}</p>
					</div>
					<div>
						<p className='text-lightText dark:text-darkText'>Symbol</p>
						<p className='text-lightText dark:text-darkText font-bold'>{symbol}</p>
					</div>
				</div>
			</div>
			<div className='flex justify-center'>
				{action}
			</div>
		</Card>
	)
}

export default index