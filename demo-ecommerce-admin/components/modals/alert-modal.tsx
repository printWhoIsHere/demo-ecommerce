'use client'

import { useEffect, useState } from 'react'

import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

interface AlertModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	isPending: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	isPending,
}) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<Modal
			title='Are you sure?'
			description="This action can't be undone."
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className='w-full flex-end pt-6 space-x-2'>
				<Button variant='outline' onClick={onClose} disabled={isPending}>
					Close
				</Button>
				<Button variant='destructive' onClick={onConfirm} disabled={isPending}>
					Confirm
				</Button>
			</div>
		</Modal>
	)
}
