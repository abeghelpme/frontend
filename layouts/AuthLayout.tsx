import { LogoBanner, PageMetaData } from "@/components/common";
import type { AuthLayoutProps } from "@/interfaces";

export const AuthLayout = ({
	children,
	title,
	content,
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
				{!hasSuccess ? (
					<div
						className={`mx-auto w-[90%] space-y-4 md:space-y-6 rounded-lg bg-white py-5 px-4 shadow-auth-layout-shadow md:mx-0 md:p-9 ${
							contentClass! ? contentClass : "max-w-wAuthFlow"
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
