import { Button } from "@/components/ui";
import type { WithPageLayout } from "@/interfaces";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: WithPageLayout = () => {
	const router = useRouter();
	const { user, clearSession } = useSession();

	console.log(user);
	return (
		<main className="h-screen w-full md:flex">
			<div className="relative w-1/2 ml-[-3vw] hidden md:block">
				<Image
					src="/hero.jpg"
					alt="Hero Image"
					fill={true}
					objectFit="contain"
				/>
			</div>
			{!user ? (
				<div className="flex-1 w-full h-full flex flex-col items-center justify-center md:ml-[-3vw]">
					<h1 className="font-bold text-2xl md:text-5xl text-[#1B1818] mb-16">
						Get started
					</h1>
					<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-[65%]">
						<Button
							variant="primary"
							className="flex-1"
							onClick={() => router.push("/signup")}
						>
							Sign up{" "}
						</Button>
						<Button
							variant="primary"
							className="flex-1"
							onClick={() => router.push("/signin")}
						>
							Sign in
						</Button>
					</div>
					<div className="mt-20">
						<div className="flex space-x-2 items-center justify-center">
							<svg
								width="25"
								height="25"
								viewBox="0 0 25 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3.26028 0.501495C9.39662 0.497518 15.5332 0.501495 21.6695 0.513191C23.0492 0.684418 23.9577 1.42898 24.3947 2.7471C24.441 2.91575 24.4721 3.08745 24.4882 3.26171C24.5039 9.42144 24.5039 15.5814 24.4882 21.7411C24.2277 23.3117 23.3114 24.2279 21.7397 24.4897C15.58 24.5053 9.42002 24.5053 3.26028 24.4897C2.11245 24.3313 1.28204 23.7348 0.769063 22.7002C0.631988 22.3699 0.54614 22.027 0.511754 21.671C0.496082 15.5346 0.496082 9.39805 0.511754 3.26171C0.647192 2.21494 1.16579 1.42336 2.0673 0.887458C2.44438 0.68512 2.84204 0.556465 3.26028 0.501495Z"
									fill="#8D8B8B"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.4736 3.98633C15.6472 9.64033 18.8128 15.3011 21.9707 20.9687C21.963 20.9764 21.955 20.9844 21.9473 20.9921C18.7873 19.4276 15.6215 17.8761 12.4503 16.3371C9.30056 17.8847 6.1504 19.4246 3 20.957C6.16396 15.3023 9.32185 9.64548 12.4736 3.98633Z"
									fill="#FEFEFE"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.4777 7.42578C14.2941 10.637 16.099 13.8573 17.8929 17.0866C17.9091 17.106 17.9051 17.1216 17.8812 17.1333C16.0747 16.2477 14.2698 15.3588 12.4661 14.4667C10.6822 15.3371 8.90046 16.2105 7.12105 17.0866C7.11333 17.0788 7.10538 17.0709 7.09766 17.0632C8.89133 13.8501 10.6848 10.6377 12.4777 7.42578Z"
									fill="#8D8B8B"
								/>
							</svg>
							<h1 className="font-medium text-sm md:text-base text-[#8D8B8B]">
								AbegHelp.me
							</h1>
						</div>
					</div>
				</div>
			) : (
				<div className="w-1/2 bg-red-500 flex items-center justify-center">
					<Button
						variant="primary"
						onClick={async () => {
							const { data, error } = await callApi("/auth/signout");
							clearSession();
						}}
						className="w-[20vw]"
					>
						Signout
					</Button>
				</div>
			)}
		</main>
	);
};

export default Home;
