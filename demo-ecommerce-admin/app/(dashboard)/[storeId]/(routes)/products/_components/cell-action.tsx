'use client'

import axios from 'axios'
import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { LuCopy, LuFileEdit, LuMoreHorizontal, LuTrash } from 'react-icons/lu'

import { toast } from '@/hooks/use-toast'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AlertModal } from '@/components/modals/alert-modal'

import { ProductColumn } from './columns'

interface CellActionProps {
	data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter()
	const params = useParams()

	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const onCopy = (id: string) => [
		navigator.clipboard.writeText(id),
		toast({
			title: 'Product ID copied to the clipboard',
		}),
	]

	const onDelete = () => {
		try {
			startTransition(async () => {
				await axios.delete(`/api/${params.storeId}/products/${data.id}`)
				router.refresh()
				toast({
					variant: 'success',
					title: 'Product Deleted',
				})
				setOpen(false)
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title:
					'Make sure you removed all categories using this products first.',
			})
		}
	}

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				isPending={isPending}
			/>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<LuMoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<LuCopy className='h-4 w-4 mr-2' />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/${params.storeId}/products/${data.id}`)
						}
					>
						<LuFileEdit className='h-4 w-4 mr-2' />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<LuTrash className='h-4 w-4 mr-2' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
