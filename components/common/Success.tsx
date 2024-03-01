import { cn } from "@/lib";
import { Player } from "@lottiefiles/react-lottie-player";
import type { ReactNode } from "react";

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
			<Player
				className={cn("size-[200px]", classNames?.lottiePlayer)}
				autoplay
				loop
				src="https://lottie.host/93bf3dac-15f5-42b4-a224-deaf8748cb5b/FZJMtsnjYZ.json"
			/>
			<div className="mb-5 text-center">
				<h1 className={cn("text-xl font-medium", classNames?.heading)}>Success!</h1>
				<p className={classNames?.description}>{description}</p>
			</div>
			{children}
		</div>
	);
};

export default Success;
