'use client'

import { useParams, useRouter } from 'next/navigation'
import { LuPlus } from 'react-icons/lu'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

import { ColorColumn, columns } from './columns'

interface ColorsClientProps {
	data: ColorColumn[]
}

export const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className='flex-between'>
				<Heading
					title={`Colors (${data.length})`}
					description='Manage colors for you store'
				/>

				<Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
					<LuPlus className='h-4 w-4 mr-2' />
					Add New
				</Button>
			</div>

			<Separator />

			<DataTable columns={columns} data={data} searchKey='name' />

			<Heading title='API' description='API calls for Colors' />
			<Separator />
			<ApiList entityName='colors' entityIdName='colorId' />
		</>
	)
}
