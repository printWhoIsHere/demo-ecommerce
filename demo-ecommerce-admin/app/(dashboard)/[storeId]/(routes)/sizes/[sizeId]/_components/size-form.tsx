'use client'

import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuTrash } from 'react-icons/lu'
import { Size } from '@prisma/client'

import { toast } from '@/hooks/use-toast'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'

interface SizeFormProps {
	initialData: Size | null
}

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
})

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const title = initialData ? 'Edit size' : 'Create size'
	const description = initialData ? 'Edit a size' : 'Add a new size'
	const toastMessage = initialData ? 'Size updated' : 'Size created'
	const action = initialData ? 'Save changes' : 'Create'

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		try {
			startTransition(async () => {
				if (initialData) {
					await axios.patch(
						`/api/${params.storeId}/sizes/${params.sizeId}`,
						data
					)
				} else {
					await axios.post(`/api/${params.storeId}/sizes`, data)
				}

				router.refresh()
				router.push(`/${params.storeId}/sizes`)

				toast({
					variant: 'success',
					title: toastMessage,
				})
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Something went wrong...',
			})
		}
	}

	const onDelete = () => {
		try {
			startTransition(async () => {
				await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
				router.refresh()
				router.push('/')
				toast({
					variant: 'success',
					title: 'Size Deleted',
				})
				setOpen(false)
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Make sure you removed all categories using this sizes first.',
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

			<div className='flex-between'>
				<Heading title={title} description={description} />

				{initialData && (
					<Button
						variant='destructive'
						size='icon'
						onClick={() => {
							setOpen(true)
						}}
					>
						<LuTrash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-8'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Size name'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Size value'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' className='ml-auto' disabled={isPending}>
						{action}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	)
}
