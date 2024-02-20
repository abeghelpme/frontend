import { LogoBanner, PageMetaData } from "@/components/common";
import type { AuthLayoutProps } from "@/interfaces";
import authBgJar from "@/public/assets/images/auth/auth-bg-jar.svg";
import Image from "next/image";

export const AuthLayout = ({
	children,
	title,
	content,
	formType,
	greeting,
	heading,
	withHeader,
	contentClass,
	hasSuccess,
}: AuthLayoutProps) => {
	return (
		<>
			<PageMetaData title={title} content={content} />
			<div
				className={`relative flex min-h-svh justify-center items-center py-14`}
			>
				{formType === "signup" && (
					<Image
						src={authBgJar as string}
						alt=""
						priority
						className="absolute inset-0 -z-[1] h-full w-full object-cover object-[75%]"
					/>
				)}

				{!hasSuccess ? (
					<div
						className={`mx-auto my-auto w-[90%] space-y-4 md:space-y-6 rounded-lg bg-white py-5 px-4 shadow-auth-layout-shadow md:mx-0 md:p-12 ${
							contentClass! ? contentClass : "max-w-[467px]"
						}`}
					>
						<LogoBanner />
						{withHeader && (
							<div className="space-y-2 text-center font-medium">
								<h1 className="font-semibold md:text-2xl">{heading}</h1>
								<p className="text-sm font-medium md:text-xl">{greeting}</p>
							</div>
						)}
						{children}
					</div>
				) : (
					<div className="my-auto w-full">{children}</div>
				)}
			</div>
		</>
	);
};
