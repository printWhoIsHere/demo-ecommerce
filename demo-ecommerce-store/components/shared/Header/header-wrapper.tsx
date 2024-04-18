'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
	const { scrollY } = useScroll()
	const [hidden, setHidden] = useState(false)
	useMotionValueEvent(scrollY, 'change', (latest) => {
		const prev = scrollY.getPrevious() || 0
		if (latest > prev && latest > 50) {
			setHidden(true)
		} else {
			setHidden(false)
		}
	})

	return (
		<motion.header
			variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
			animate={hidden ? 'hidden' : 'visible'}
			transition={{ duration: 0.25, ease: 'easeInOut' }}
			className='sticky top-0 py-2 shadow-md z-50 mb-5 border-b'
		>
			{children}
		</motion.header>
	)
}

export default HeaderWrapper
