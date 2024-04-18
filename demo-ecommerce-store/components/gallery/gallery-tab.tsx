import Image from 'next/image'
import { Tab } from '@headlessui/react'

import { cn } from '@/lib/utils'
import { Image as ImageType } from '@/types'

interface GalleryTabProps {
	image: ImageType
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
	return (
		<Tab className='relative flex-center aspect-square cursor-pointer rounded-md'>
			{({ selected }) => (
				<div>
					<span className='absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md'>
						<Image
							src={image.url}
							alt='Image'
							className='object-cover object-center'
							fill
						/>
					</span>
					<span
						className={cn(
							'absolute inset-0 rounded-md ring-2 ring-offset-2',
							selected ? 'ring-primary' : 'ring-transparent'
						)}
					/>
				</div>
			)}
		</Tab>
	)
}

export default GalleryTab
