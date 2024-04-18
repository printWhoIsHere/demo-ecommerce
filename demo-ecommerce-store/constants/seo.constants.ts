import { Metadata } from 'next'

export const SITE_NAME = 'Ecommerce'

export const NO_INDEX_PAGE: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
}
