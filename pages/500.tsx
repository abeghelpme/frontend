import { Button } from "@/components/ui";
import ErrorImage from "@/public/assets/images/error-pages/500.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ServerError: React.FC = () => {
	const router = useRouter();
	return (
		<div className="flex px-5 min-h-screen items-center justify-center">
			<div className="relative flex flex-col max-w-wSignUpForm flex-1  w-full items-center gap-4 py-4 justify-center">
				<Image
					src={ErrorImage}
					alt=""
					height={400}
					width={400}
					role="presentation"
					sizes="(min-width: 808px) 50vw, 100vw"
					priority
					className="w-full max-h-[28rem]"
				/>

				<p className="text-abeg-primary text-md self-start  md:self-center  md:text-3xl text-center">
					An error occurred on our server. Please try again later
				</p>
				<div className="w-full flex flex-col md:flex-row justify-center gap-4">
					<Button
						size="lg"
						variant="secondary"
						className=" font-semibold text-md rounded-md px-16"
						onClick={() => router.back()}
					>
						Go back
					</Button>
					<Button
						size="lg"
						variant="primary"
						className=" font-semibold text-md rounded-md"
						onClick={() => router.push("/")}
					>
						Take me home
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ServerError;
