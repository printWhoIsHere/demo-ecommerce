'use client'

import { LuShoppingCart } from 'react-icons/lu'

import { Product } from '@/types'

import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Currency from '@/components/ui/currency'

interface InfoProps {
	data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
	return (
		<div>
			<h1 className='text-3xl font-bold'>{data.name}</h1>
			<div className='mb-3 flex items-end justify-between'>
				<p className='text-2xl font-thin'>
					<Currency value={data?.price} />
				</p>
			</div>

			<Separator className='my-4' />

			<div className='flex flex-col gap-y-2'>
				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold'>Size:</h3>
					<div>{data?.size?.name}</div>
				</div>

				<div className='flex items-center gap-x-4'>
					<h3 className='font-semibold'>Color:</h3>
					<div className='flex items-center space-x-2'>
						<p>{data?.color?.name}</p>
						<div
							className='h-6 w-6 rounded-full border'
							style={{ backgroundColor: data?.color?.value }}
						/>
					</div>
				</div>

				<div className='mt-10 flex items-center gap-x-3'>
					<Button>
						Add to Cart
						<LuShoppingCart className='h-4 w-4 ml-2' />
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Info
