import React from 'react'
import ItemList from './ItemList';
import Card from "../Card"

const index = ({ data }) => {
	return (
		<Card className="p-3">
			<div>
				<p className='text-lightText dark:text-darkText font-semibold'>ტოკენების ბალანსი</p>
			</div>
			<div className='overflow-scroll overflow-x-hidden max-h-[210px]'>
				{data.length > 0 ? (
					<div>
						{data.map((x, index) => (
							<ItemList key={index} name={x.name} symbol={x.symbol} balance={Number(x.balance) / 10 ** Number(x.decimals)} tokenAddress={x.token_address} />
						))}
					</div>
				) : (
					<div className='flex justify-center text-lightText dark:text-darkText text-md font-semibold mt-2'>
						ტოკენები არ გაქვთ
					</div>
				)}
			</div>
		</Card>
	)
}

export default index