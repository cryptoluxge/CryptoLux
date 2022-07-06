import React from 'react'
/* import ItemList from './itemList' */
import Card from "../Card"

const index = ({ title,  children }) => {
	return (
		<Card className="p-3">
			<div>
				<p className='text-lightText dark:text-darkText font-semibold'>{title}</p>
			</div>
			<div className='mt-2'>
				{children}
			</div>
		</Card>
	)
}

export default index