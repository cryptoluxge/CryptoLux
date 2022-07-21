import React from 'react'
import Card from "../Card"

const index = ({ name, category, description, link, logo }) => {
	return (
		<Card className="p-3">
			<div className='flex items-center space-x-2'>
				<img src={logo} alt={name} className="w-12 rounded-lg" />
				<div className=''>
					<p className='text-lightText dark:text-darkText font-bold'>{name}</p>
					<p className='text-lightText dark:text-darkText text-sm'>{category}</p>
				</div>
			</div>
			<p className='text-lightText dark:text-darkText py-3 text-sm'>{description}</p>
			<div className='flex justify-center'>
				<a href={link} target="blank" className='w-full'>
					<button className='w-full h-full py-2 bg-gradient-to-br from-violet to-violetDark text-white rounded-lg duration-150 hover:scale-95 text-sm font-semibold'>საიტის ნახვა</button>
				</a>
			</div>
		</Card>
	)
}

export default index