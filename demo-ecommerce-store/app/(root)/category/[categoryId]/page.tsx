import getProducts from '@/actions/get-products'
import getColors from '@/actions/get-colors'
import getSizes from '@/actions/get-sizes'
import getCategory from '@/actions/get-category'

import Billboard from '@/components/billboard'
import Filter from './_components/filter'
import { NoResults } from '@/components/ui/no-results'
import ProductCard from '@/components/product-card'

export const revalidate = 0

export default async function Category({
	params,
	searchParams,
}: {
	params: { categoryId: string }
	searchParams: { colorId: string; sizeId: string }
}) {
	const products = await getProducts({
		categoryId: params.categoryId,
		colorId: searchParams.colorId,
		sizeId: searchParams.sizeId,
	})
	const sizes = await getSizes()
	const colors = await getColors()
	const category = await getCategory(params.categoryId)

	return (
		<div>
			<Billboard data={category.billboard} />

			<div className='px-4 sm:px-6 lg:px-8 pb-24'>
				<div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
					<div className='hidden lg:block'>
						<Filter valueKey='sizeId' name='Sizes' data={sizes} />
						<Filter valueKey='colorId' name='Colors' data={colors} />
					</div>

					<div className='mt-6 lg:col-span-4 lg:mt-0'>
						{products.length === 0 && <NoResults />}
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
							{products.map((item) => (
								<ProductCard key={item.id} data={item} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
