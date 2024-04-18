import Header from '@/components/shared/Header'
import Footer from '@/components/shared/footer'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='relative flex flex-col'>
			<Header />
			<main className='container flex-1'>{children}</main>
			{/* <Footer /> */}
		</div>
	)
}
