'use client'

import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuTrash } from 'react-icons/lu'
import { Store } from '@prisma/client'

import { toast } from '@/hooks/use-toast'
import { useOrigin } from '@/hooks/use-origin'

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
import { ApiAlert } from '@/components/ui/api-alert'

interface SettingsFormProps {
	initialData: Store
}

const formSchema = z.object({
	name: z.string().min(1),
})

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
	const params = useParams()
	const router = useRouter()
	const origin = useOrigin()

	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		try {
			startTransition(async () => {
				await axios.patch(`/api/stores/${params.storeId}`, data)
				router.refresh()
				toast({
					variant: 'success',
					title: 'Store Updated',
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
				await axios.delete(`/api/stores/${params.storeId}`)
				router.refresh()
				router.push('/')
				toast({
					variant: 'success',
					title: 'Store Deleted',
				})
				setOpen(false)
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Make sure you removed all products and categories first.',
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
				<Heading title='Settings' description='Manage store preferences' />
				<Button
					variant='destructive'
					size='icon'
					onClick={() => {
						setOpen(true)
					}}
				>
					<LuTrash className='h-4 w-4' />
				</Button>
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
											placeholder='Store name'
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' className='ml-auto' disabled={isPending}>
						Save changes
					</Button>
				</form>
			</Form>

			<Separator />
			<ApiAlert
				title='NEXT_PUBLIC_API_URL'
				description={`${origin}/api/${params.storeId}`}
				variant={'public'}
			/>
		</>
	)
}
