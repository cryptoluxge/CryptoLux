import React from 'react'
import ApplicationCard from "../../components/Cards/ApplicationCard"
import { AppList } from './AppsList'

const index = () => {
	return (
		<div className='mt-5'>
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
				{AppList.map((x) => <ApplicationCard key={x.name} name={x.name} category={x.category} description={x.description} logo={x.logo} link={x.url} />)}
			</div>
		</div>
	)
}

export default index