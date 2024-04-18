'use client'

import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuTrash } from 'react-icons/lu'
import { Billboard, Category } from '@prisma/client'

import { toast } from '@/hooks/use-toast'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@/components/ui/select'
import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'
import { SelectTrigger } from '@/components/ui/select'

interface CategoryFormProps {
	initialData: Category | null
	billboards: Billboard[]
}

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1),
})

export const CategoryForm: React.FC<CategoryFormProps> = ({
	initialData,
	billboards,
}) => {
	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const title = initialData ? 'Edit category' : 'Create category'
	const description = initialData ? 'Edit a category' : 'Add a new category'
	const toastMessage = initialData ? 'Category updated' : 'Category created'
	const action = initialData ? 'Save changes' : 'Create'

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			billboardId: '',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		try {
			startTransition(async () => {
				if (initialData) {
					await axios.patch(
						`/api/${params.storeId}/categories/${params.categoryId}`,
						data
					)
				} else {
					await axios.post(`/api/${params.storeId}/categories`, data)
				}

				router.refresh()
				router.push(`/${params.storeId}/categories`)

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
					`/api/${params.storeId}/categories/${params.billboardId}`
				)
				router.refresh()
				router.push('/')
				toast({
					variant: 'success',
					title: 'Category Deleted',
				})
				setOpen(false)
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title:
					'Make sure you removed all categories using this categories first.',
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
											placeholder='Category label'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='billboardId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={isPending}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														placeholder='Select a billboard'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{billboards.map((billboard) => (
													<SelectItem key={billboard.id} value={billboard.id}>
														{billboard.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
