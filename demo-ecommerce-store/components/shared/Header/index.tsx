import Link from 'next/link'

import getCategories from '@/actions/get-categories'

import HeaderNav from './header-nav'
import HeaderWrapper from './header-wrapper'
import HeaderActions from './haeder-actions'

export const revalidate = 0

const Header = async () => {
	const categories = await getCategories()

	return (
		<HeaderWrapper>
			<div className='container relative flex-between'>
				<div className='flex flex-row'>
					<Link href='/'>
						<p className='font-bold text-xl'>Store</p>
					</Link>

					<HeaderNav data={categories} />
				</div>

				<HeaderActions />
			</div>
		</HeaderWrapper>
	)
}

export default Header
