'use client'

import { LuCopy, LuServer } from 'react-icons/lu'

import { toast } from '@/hooks/use-toast'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ApiAlertProps {
	title: string
	description: string
	variant: 'public' | 'admin'
}

const textMap: Record<ApiAlertProps['variant'], string> = {
	public: 'Public',
	admin: 'Admin',
}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
	public: 'secondary',
	admin: 'destructive',
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
	title,
	description,
	variant,
}) => {
	const onCopy = (description: string) => [
		navigator.clipboard.writeText(description),
		toast({
			title: 'API Route copied to the clipboard',
		}),
	]

	return (
		<Alert>
			<LuServer className='h-4 w-4' />
			<AlertTitle className='flex items-center gap-x-2'>
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className='flex-between mt-4'>
				<code className='relative rounded bg-muted px-2 py-1 font-mono text-sm font-semibold'>
					{description}
				</code>

				<Button
					variant='outline'
					size='icon'
					onClick={() => onCopy(description)}
				>
					<LuCopy className='h-4 w-4' />
				</Button>
			</AlertDescription>
		</Alert>
	)
}
