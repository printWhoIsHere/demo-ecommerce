'use client'

import Image from 'next/image'
import { LuExpand, LuShoppingBag } from 'react-icons/lu'

import { Product } from '@/types'
import useCart from '@/hooks/use-cart'

import IconButton from '@/components/ui/icon-button'
import Currency from '@/components/ui/currency'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'

interface ProductCardProps {
	data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
	const cart = useCart()
	const router = useRouter()

	const handleClick = () => {
		router.push(`/product/${data?.id}`)
	}

	const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation()
		cart.addItem(data)
	}

	return (
		<div
			onClick={handleClick}
			className='group cursor-pointer rounded-xl border p-3 space-y-4 w-[250px]'
		>
			<div className='aspect-square rounded-xl relative bg-muted'>
				<Image
					src={data?.images?.[0]?.url}
					alt='Image'
					fill
					className='aspect-squart object-cover rounded-md'
				/>

				<div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
					<div className='flex-center gap-x-6'>
						<IconButton onClick={() => {}} icon={<LuExpand size={15} />} />
						<IconButton
							onClick={onAddToCart}
							icon={<LuShoppingBag size={15} />}
						/>
					</div>
				</div>
			</div>

			<div>
				<p className='font-semibold text-lg'>{data.name}</p>
				<p className='text-sm text-muted-foreground'>{data.category?.name}</p>
			</div>

			<div className='flex-between'>
				<Currency value={data?.price} />
			</div>
		</div>
	)
}

export default ProductCard
