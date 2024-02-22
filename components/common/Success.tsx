import { Player } from "@lottiefiles/react-lottie-player";
import { type ReactNode } from "react";

type SuccessProps = {
	children: ReactNode;
	textContent: string;
};

const Success = ({ children, textContent }: SuccessProps) => {
	return (
		// add glassmorphism here too
		<div className="mx-auto w-w90 max-w-wSuccess rounded-md bg-white p-6 shadow-auth-layout-shadow sm:w-1/2">
			<Player
				autoplay
				loop
				src="https://lottie.host/a60494de-7c09-4dbd-b016-97035289ba6a/4FRd7uct0G.json"
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
