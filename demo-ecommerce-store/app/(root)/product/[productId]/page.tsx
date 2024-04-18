import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'

import { Separator } from '@/components/ui/separator'
import ProductList from '@/components/product-list'
import Gallery from '@/components/gallery'
import Info from '@/components/info'

export default async function ProductPage({
	params,
}: {
	params: { productId: string }
}) {
	const product = await getProduct(params.productId)
	const suggestedProducts = await getProducts({
		categoryId: product?.category?.id,
	})

	return (
		<div className='px-4 py-10 sm:px-6 lg:px-8'>
			<div className='lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8'>
				<Gallery images={product.images} />

				<div className='mt-10 pxx-4 sm:mt-16 sm:px-0 lg:mt-0'>
					<Info data={product} />
				</div>
			</div>

			<Separator className='my-10' />

			<ProductList title='Related Items' items={suggestedProducts} />
		</div>
	)
}
