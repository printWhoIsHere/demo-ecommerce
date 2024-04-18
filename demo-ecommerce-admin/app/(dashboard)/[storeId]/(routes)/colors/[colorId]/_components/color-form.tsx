'use client'

import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuTrash } from 'react-icons/lu'
import { Color } from '@prisma/client'

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

interface ColorFormProps {
	initialData: Color | null
}

const formSchema = z.object({
	name: z.string().min(1),
	value: z
		.string()
		.min(4)
		.regex(/^#/, { message: 'String must be a valid HEX code' }),
})

export const ColorFom: React.FC<ColorFormProps> = ({ initialData }) => {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const title = initialData ? 'Edit color' : 'Create color'
	const description = initialData ? 'Edit a color' : 'Add a new color'
	const toastMessage = initialData ? 'Color updated' : 'Color created'
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
						`/api/${params.storeId}/colors/${params.colorId}`,
						data
					)
				} else {
					await axios.post(`/api/${params.storeId}/colors`, data)
				}

				router.refresh()
				router.push(`/${params.storeId}/colors`)

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
				await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
				router.refresh()
				router.push('/')
				toast({
					variant: 'success',
					title: 'Color Deleted',
				})
				setOpen(false)
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Make sure you removed all categories using this colors first.',
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
											placeholder='Color name'
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
										<div className='flex items-center gap-x-4'>
											<Input
												{...field}
												placeholder='Color value'
												disabled={isPending}
											/>
											<div
												className='p-4 rounded-full border'
												style={{ backgroundColor: field.value }}
											/>
										</div>
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
