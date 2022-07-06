import React from 'react'
import GroupsCard from "../../components/Cards/GroupsCard"
import { GroupList } from './GroupList'

const index = () => {
	return (
		<div className='mt-5'>
			<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
				{GroupList.map((x) => <GroupsCard key={x.name} name={x.name} social={x.social} logo={x.logo} link={x.url} />)}
			</div>
		</div>
	)
}

export default index