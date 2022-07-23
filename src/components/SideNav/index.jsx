import React, { useState } from 'react'
import Logo from "../../images/logo.png"
import SidenavItem from './SidenavItem'
import Navbar from "../../components/ConnectWallet"
import { Transition } from '@headlessui/react'
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"
import { menuItem } from '../../routes'
import DarkModeButton from "../DarkModeButton"

const Index = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<Transition show={isOpen}
				className="fixed h-screen flex md:hidden mt-12"
				enter="transition ease-in-out duration-300 transform"
				enterFrom="-translate-x-full"
				enterTo="translate-x-0"
				leave="transition ease-in-out duration-300 transform"
				leaveFrom="translate-x-0"
				leaveTo="-translate-x-full">
				<div className='z-10 inset-0 w-[250px] p-3 mt-[-50px] bg-lightBackground dark:bg-darkBackground rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 shadow'>
					<div className='flex items-center justify-between'>
						<a href="/">
							<div className='flex items-center space-x-3 cursor-pointer'>
								<img src={Logo} alt="კრიპტოლუქსის ლოგო" className='w-9' />
								<p className='text-lightText dark:text-darkText text-sm font-semibold'>კრიპტოლუქსი</p>
							</div>
						</a>
						<div className='duration-75 hover:bg-primary rounded-lg p-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
							<AiOutlineClose className='group group-hover:text-white text-lightText dark:text-white text-xl' />
						</div>
					</div>
					<div className='border-[1px] rounded-full w-full mt-3 border-primary shadow-xl shadow-primary'></div>
					<div className='h-screen overflow-y-auto' >
						<div className='mt-3'>
							<SidenavItem menuItem={menuItem} />
						</div>
					</div>
				</div>
			</Transition>
			<div className="md:flex">
				<div className="hidden md:flex flex-col p-4" style={{ width: "235px" }}>
					<a href="/">
						<div className='flex items-center space-x-3 cursor-pointer'>
							<img src={Logo} alt="კრიპტოლუქსის ლოგო" className='w-9' />
							<p className='text-lightText dark:text-darkText text-sm font-semibold'>კრიპტოლუქსი</p>
						</div>
					</a>
					<div className='border-[1px] rounded-full w-[170px] mt-3 border-primary shadow-xl shadow-primary'></div>
					<div className='mt-3'>
						<SidenavItem menuItem={menuItem} />
					</div>
				</div>
				<main className='w-full'>
					<div className='flex justify-between md:justify-end'>
						<div className='flex md:hidden'>
							{isOpen ? (
								<div className='duration-150 hover:bg-primary rounded-lg p-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
									<AiOutlineClose className='text-lightText dark:text-darkText text-xl ' />
								</div>
							) : (
								<div className='duration-150 hover:bg-primary rounded-lg group p-3 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
									<GiHamburgerMenu className='group group-hover:text-white text-lightText dark:text-white text-xl' />
								</div>
							)}
						</div>
						<div className='flex items-center'>
							<Navbar />
							<DarkModeButton />
						</div>
					</div>
					{children}
				</main>
			</div>
		</div>
	)
}

export default Index