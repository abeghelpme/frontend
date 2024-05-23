import { cn } from "@/lib";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import SuccessLottie from "../../public/assets/lottie/success.json";

const Lottie = dynamic(async () => import("lottie-react"), { ssr: false });

type SuccessProps = {
	children?: ReactNode;
	description: string;
	classNames?: {
		lottiePlayer?: string;
		wrapper?: string;
		heading?: string;
		description?: string;
	};
};

const Success = ({ children, description, classNames }: SuccessProps) => {
	return (
		<div
			className={cn(
				"mx-auto w-w90 max-w-wAuthFlow rounded-md bg-white/50 p-6 shadow-auth-layout-shadow backdrop-blur-lg",
				classNames?.wrapper
			)}
		>
			<Lottie
				animationData={SuccessLottie}
				loop={true}
				autoplay={true}
				className={cn("size-[200px] mx-auto", classNames?.lottiePlayer)}
			/>
			<div className="mb-5 text-center">
				<h1 className={cn("text-xl font-medium", classNames?.heading)}>
					Success!
				</h1>
				<p className={classNames?.description}>{description}</p>
			</div>
			{children}
		</div>
	);
};

export default Success;
