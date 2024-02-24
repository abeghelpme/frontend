import { LogoBanner, PageMetaData } from "@/components/common";
import type { AuthLayoutProps } from "@/interfaces";

export const AuthPagesLayout = ({
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
		<main className="relative flex h-full min-h-svh items-center justify-center bg-authBg bg-cover bg-no-repeat py-14 ">
			<PageMetaData title={title} content={content} />
			<div className="w-full z-10 flex flex-col items-center justify-center">
				{!hasSuccess ? (
					<div
						className={`mx-auto w-w90
           space-y-4 rounded-lg border-abeg-primary bg-white/50 px-4 py-5 shadow-auth-layout-shadow backdrop-blur-lg md:mx-0 md:space-y-6 md:p-9 lg:p-12 ${
							contentClass! ? contentClass : "md:max-w-wAuthFlow"
						}`}
					>
						<LogoBanner />
						{withHeader && (
							<div className="space-y-2 text-center">
								<h1 className="md:text-2xl">{heading}</h1>
								<p className="text-sm md:text-lg">{greeting}</p>
							</div>
						)}
						{children}
					</div>
				) : (
					<div className="my-auto w-full">{children}</div>
				)}
			</div>
			<div className="absolute inset-0 bg-black/25" />
		</main>
	);
};
