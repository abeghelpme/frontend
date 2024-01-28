import logo from '@/public/assets/images/shared/logo.svg'
import Image from 'next/image'

type CompProp = {
	message?: string | JSX.Element
}

export const Loader = ({message}: CompProp) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden font-medium text-abeg-teal-10">
			<div className="flex items-center justify-center gap-2">
				<Image
					className="w-[35px] md:w-[40px] lg:aspect-square lg:w-[46px]"
					src={logo as string}
					priority
					alt=""
				/>
				<span role="" className="">
					AbegHelp.me
				</span>
			</div>
			<p className="text-sm">{message}</p>
		</div>
	)
}
