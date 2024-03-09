import { Button } from "@/components/ui";
import { BaseLayout } from "@/layouts";
import ErrorImage from "@/public/assets/images/error-pages/404.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
``;

const NotFound = () => {
	const router = useRouter();

	return (
		<BaseLayout>
			<div className="flex px-5  items-center min-h-screen items-center justify-center">
				<div className="relative flex flex-col max-w-wSignUpForm flex-1 h-full w-full items-center gap-4  justify-center">
					<Image
						src={ErrorImage}
						alt=""
						height={400}
						role="presentation"
						sizes="(min-width: 808px) 50vw, 100vw"
						priority
						className="w-full max-h-[25rem]"
					/>
					<h2 className="text-3xl  md:text-6xl font-bold text-abeg-primary leading-relaxed">
						Well this is embarrassing
					</h2>
					<p className="text-abeg-primary text-md self-start  md:self-center  md:text-3xl">
						Seems we can’t find what you’re looking for.
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
		</BaseLayout>
	);
};
export default NotFound;
