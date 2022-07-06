import React from 'react'
import ItemList from './ItemList';
import Card from "../Card"

const index = ({ data }) => {
	return (
		<Card className="p-3">
			<div>
				<p className='text-lightText dark:text-darkText font-semibold'>ბოლო ტრანზაქციები</p>
			</div>
			<div className='overflow-scroll overflow-x-hidden max-h-[210px]'>
				{data.length > 0 ? (
					<div>
						{data.map((x, index) => (
							<ItemList key={index} toAddress={x.to_address} fromAddress={x.from_address} txHash={x.hash} />
						))}
					</div>
				) : (
					<div className='flex justify-center text-lightText dark:text-darkText text-md font-semibold mt-2'>
						ტრანზაქციები არ გაქვთ
					</div>
				)}
			</div>
		</Card>
	)
}

export default index