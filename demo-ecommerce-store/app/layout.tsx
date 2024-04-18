import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/providers/theme-provider'
import { SITE_NAME } from '@/constants/seo.constants'
import { Toaster } from '@/components/ui/toaster'

import '@/style/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: 'For educational purposes',
	icons: {
		icon: '/assets/icons/logo.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='dark'>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
