import React from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import SidenavItemCollapse from './SidenavItemCollapse';

const SidenavItem = ({ menuItem }) => {
	const location = useLocation();
	const { pathname } = location;

	const renderRoutes = menuItem.map(({ type, path, name, icon, key, collapse }) => {
		let returnValue;
		const active = path === pathname
		if (type === "noncollapsible") {
			returnValue = (
				<div key={key} className='mt-1'>
					<NavLink exact="true" to={path}>
						<div className={`${active ? "bg-white dark:bg-darkCard shadow-lg" : ""} flex items-center space-x-2 cursor-pointer duration-150 hover:bg-white dark:hover:bg-darkCard w-full h-[50px] px-2 rounded-md`}>
							<div className={`w-[28px] h-[28px] ${active ? "bg-gradient-to-br from-violet to-violetDark" : "bg-gray-400 dark:bg-darkCard"} rounded-md flex items-center justify-center shadow shadow-${active ? "primary" : null}`}>
								<img src={icon} alt={name} className='w-4' />
							</div>
							<h1 className={`${active ? "text-lightText dark:text-darkText" : "text-lightText dark:text-darkText"} text-sm font-semibold`}>{name}</h1>
						</div>
					</NavLink>
				</div>
			);
		} else if (type === "title") {
			returnValue = (
				<p key={key} className='text-lightText dark:text-darkText font-bold px-2 mt-2'>{name}</p>
			);
		} else if (type === "collapsible") {
			returnValue = (
				<SidenavItemCollapse name={name} icon={icon} key={key} path={path} pathname={pathname} collapse={collapse} />
			)
		}
		return returnValue;
	});

	return renderRoutes
}

export default SidenavItem