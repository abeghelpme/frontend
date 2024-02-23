import { LogoBanner } from "@/components/common";
import type { WithPageLayout } from "@/interfaces";
import bg from "@/public/assets/images/auth/auth-bg-jar.svg";
import Image from "next/image";
import Link from "next/link";

const Home: WithPageLayout = () => {
	return (
		<main className="min-h-svh w-w90 mx-auto lg:mr-auto lg:ml-0 flex flex-1 lg:gap-12 xl:gap-24">
			<div className="hidden lg:block lg:w-1/2 after:absolute after:inset-0 after:bg-[#00000080] relative">
				<Image src={bg} alt="" className="object-cover w-full h-full" />
			</div>
			<div className="w-full text-center md:w-1/2 md:mx-auto md:max-w-wAuthFlow flex flex-col pt-14 lg:pt-0">
				<div className="lg:absolute top-12 left-7">
					<LogoBanner className="text-white" />
				</div>
				<div className="flex flex-col justify-center h-full space-y-8">
					<h1 className="text-2xl">Get Started</h1>
					<div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
						<Link
							href="/signup"
							className="w-full py-3 px-6 bg-abeg-primary text-white rounded-lg"
						>
							Sign up
						</Link>
						<Link
							href="/signin"
							className="w-full py-3 px-6 bg-abeg-primary text-white rounded-lg"
						>
							Sign in
						</Link>
					</div>
				</div>
			</div>
			{/* <div className="">
				
			</div> */}
		</main>
	);
};

export default Home;
