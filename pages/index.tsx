import { LogoBanner } from "@/components/common";
import type { WithPageLayout } from "@/interfaces";
import bg from "@/public/assets/images/auth/auth-bg-jar.svg";
import Image from "next/image";
import Link from "next/link";

const Home: WithPageLayout = () => {
	return (
		<main className="h-full flex flex-col gap-20 py-14 md:py-20 w-w90 mx-auto md:w-w80">
			<LogoBanner />
			<div className="flex flex-1 lg:gap-12 xl:gap-24">
				<Image
					src={bg}
					alt=""
					className="hidden lg:block lg:w-1/2 object-cover"
				/>
				<div className="space-y-8 w-full text-center md:w-1/2 md:mx-auto flex flex-col justify-center">
					<h1 className="text-2xl">Get Started</h1>
					<div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:w-w80 mx-auto">
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
		</main>
	);
};

export default Home;
