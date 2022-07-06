import React from 'react'
import Card from "./Card"

const MiniCard = ({ title, data, icon, }) => {
	return (
		<Card className="p-3">
			<div className='flex items-center justify-between'>
				<div className='space-y-2'>
					<p className='text-lightText dark:text-darkText font-bold'>{title}</p>
					<p className='text-lightText dark:text-darkText'>{data}</p>
				</div>
				<div className={`w-12 h-12 rounded-md bg-gradient-to-br from-violet to-violetDark flex justify-center items-center shadow-md shadow-[#3b0087]`}>
					{icon}
				</div>
			</div>
		</Card>
	)
}

export default MiniCard