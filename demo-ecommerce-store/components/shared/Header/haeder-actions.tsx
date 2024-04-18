'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LuMoon, LuShoppingBag, LuSun } from 'react-icons/lu'

import useCart from '@/hooks/use-cart'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const HeaderActions = () => {
	const { setTheme } = useTheme()

	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const cart = useCart()

	if (!isMounted) return null

	return (
		<div className='flex-center space-x-2'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='sm' className='hover:bg-transparent'>
						<LuSun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
						<LuMoon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
						<span className='sr-only'>Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={() => setTheme('light')}>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Button variant='outline' size='sm'>
				<LuShoppingBag className='h-4 w-4 mr-2' />
				<span className='text-sm font-medium'>{cart.items.length}</span>
			</Button>
		</div>
	)
}

export default HeaderActions
