import logo from '@/public/assets/images/shared/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

const LogoBanner = () => {
	return (
		<Link href="/" className={`flex items-center justify-center gap-2`}>
			<Image
				className="aspect-square w-[24px] md:w-[32px]"
				src={logo as string}
				priority
				alt=""
			/>
			<span role="" className={`font-bold text-abeg-teal-10 md:text-xl`}>
				AbegHelp.me
			</span>
		</Link>
	)
}

export default LogoBanner
