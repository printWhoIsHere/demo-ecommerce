import { cn } from '@/lib/utils'
import { Button } from './button'
import { MouseEventHandler } from 'react'

interface IconButtonProps {
	icon: React.ReactElement
	className?: string
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

const IconButton: React.FC<IconButtonProps> = ({
	icon,
	className,
	onClick,
}) => {
	return (
		<Button
			onClick={onClick}
			className={cn(
				'rounded-full flex-center transition hover:scale-110',
				className
			)}
		>
			{icon}
		</Button>
	)
}

export default IconButton
