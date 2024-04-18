import getBillboard from '@/actions/get-billboard'
import getProducts from '@/actions/get-products'

import Billboard from '@/components/billboard'
import ProductList from '@/components/product-list'

export const revalidate = 0

export default async function HomePage() {
	const products = await getProducts({
		isFeatured: true,
	})
	const billboard = await getBillboard('6be08f0e-1290-4528-82d5-5691e8ca45df')
	return (
		<>
			<div className='space-y-10 pb-10'>
				<Billboard data={billboard} />
			</div>

			<div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
				<ProductList title='Featured Products' items={products} />
			</div>
		</>
	)
}
