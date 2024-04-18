'use client'

import { useEffect } from 'react'

import { useStoreModal } from '@/hooks/use-store-modal'

export default function Home() {
	const { isOpen, onOpen } = useStoreModal()

	useEffect(() => {
		if (!isOpen) onOpen()
	}, [isOpen, onOpen])

	return null
}
