'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Category } from '@/types'

interface MainNavProps {
	data: Category[]
}

const HeaderNav: React.FC<MainNavProps> = ({ data }) => {
	const pathname = usePathname()
	const routes = data.map((route) => ({
		label: route.name,
		href: `/category/${route.id}`,
		active: pathname === `/category/${route.id}`,
	}))

	return (
		<nav className='mx-6 flex items-center space-x-4 lg:space-x-6'>
			{routes.map((route) => (
				<Link
					href={route.href}
					key={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active ? 'text-foreground' : 'text-muted-foreground'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	)
}

export default HeaderNav
