'use client'

import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuTrash } from 'react-icons/lu'
import { Billboard } from '@prisma/client'

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
import ImageUpload from '@/components/ui/image-upload'

interface BillboardFormProps {
	initialData: Billboard | null
}

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1, { message: 'Upload background image' }),
})

export const BillboardForm: React.FC<BillboardFormProps> = ({
	initialData,
}) => {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const title = initialData ? 'Edit billboard' : 'Create billboard'
	const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
	const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
	const action = initialData ? 'Save changes' : 'Create'

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: '',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		try {
			startTransition(async () => {
				if (initialData) {
					await axios.patch(
						`/api/${params.storeId}/billboards/${params.billboardId}`,
						data
					)
				} else {
					await axios.post(`/api/${params.storeId}/billboards`, data)
				}

				router.refresh()
				router.push(`/${params.storeId}/billboards`)

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
				await axios.delete(
					`/api/${params.storeId}/billboards/${params.billboardId}`
				)
				router.refresh()
				router.push('/')
				toast({
					variant: 'success',
					title: 'Billboard Deleted',
				})
				setOpen(false)
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title:
					'Make sure you removed all categories using this billboards first.',
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
					<FormField
						control={form.control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange('')}
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='label'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Billboard label'
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
