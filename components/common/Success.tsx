import { Player } from "@lottiefiles/react-lottie-player";
import { type ReactNode } from "react";

type SuccessProps = {
	children: ReactNode;
	textContent: string;
};

const Success = ({ children, textContent }: SuccessProps) => {
	return (
		<div className="mx-auto w-w90 max-w-wAuthFlow rounded-md bg-white/50  p-6 backdrop-blur-lg shadow-auth-layout-shadow sm:w-1/2">
			<Player
				autoplay
				loop
				src="https://lottie.host/93bf3dac-15f5-42b4-a224-deaf8748cb5b/FZJMtsnjYZ.json"
				style={{ height: "200px", width: "200px" }}
			/>
			<div className="mb-5 text-center">
				<h1 className="text-xl font-medium">Success!</h1>
				<p className="">{textContent}</p>
			</div>
			{children}
		</div>
	);
};

export default Success;
