import { PageMetaData } from "@/components/common";
import { Button } from "@/components/ui";
import type { WithPageLayout } from "@/interfaces";
import { callApi } from "@/lib";
import bg from "@/public/assets/images/auth/auth-bg-jar.svg";
import { useSession } from "@/store";
import Image from "next/image";
import Link from "next/link";

const InactiveLogoBanner = ({
	fill,
	color,
	isBottom,
}: { fill?: boolean; color?: string; isBottom?: boolean }) => {
	return (
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
					fill={fill ? "#008080" : "#8D8B8B"}
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
					fill={fill ? "#008080" : "#8D8B8B"}
				/>
			</svg>
			<span
				className={`${
					!isBottom && "font-extrabold lg:text-white"
				} font-medium text-${color ? "abeg-primary" : "[#8D8B8B]"}`}
			>
				AbegHelp.me
			</span>
		</div>
	);
};
const Home: WithPageLayout = () => {
	const { user, clearSession } = useSession();
	return (
		<>
			<PageMetaData
				title="AbegHelp | Home"
				content="Get started with AbegHelp.me"
			/>
			<main className="min-h-svh w-w90 mx-auto lg:w-full lg:ml-0 flex flex-1 lg:gap-12 xl:gap-24">
				<div className="hidden lg:block after:absolute lg:w-3/5 xl:w-[70%] after:inset-0 after:bg-[#00000080] relative">
					<Image src={bg} alt="" priority className="object-cover w-full h-full" />
				</div>
				<div className="w-full text-center md:w-1/2 md:mx-auto lg:w-[30%] lg:mr-[10%] xl:mr-[5%] lg:ml-0 md:max-w-wAuthFlo flex flex-col pt-14 lg:pt-0">
					<div className="lg:absolute top-12 left-7">
						<InactiveLogoBanner fill color="abeg-primary" />
					</div>
					<div className="mt-[10rem] lg:my-auto">
						{!user ? (
							<>
								<h1 className="text-2xl mb-8 lg:mb-16 lg:text-4xl font-bold">
									Get Started
								</h1>
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
								<div className="mt-[10rem]">
									<InactiveLogoBanner isBottom />
								</div>
							</>
						) : (
							<Button
								variant="danger"
								onClick={async () => {
									const { data, error } = await callApi("/auth/signout");
									clearSession();
								}}
								className="w-fit mx-auto"
							>
								Signout
							</Button>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
