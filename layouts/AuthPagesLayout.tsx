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
		<main className="h-full bg-authBg bg-cover bg-no-repeat flex min-h-svh justify-center items-center py-14">
			<PageMetaData title={title} content={content} />
			{!hasSuccess ? (
				<div
					// do the glassmorphism here
					className={`mx-auto w-w90 space-y-4 md:space-y-6 rounded-lg bg-white py-5 px-4 shadow-auth-layout-shadow md:mx-0 md:p-9 lg:p-12 ${
						contentClass! ? contentClass : "md:max-w-wAuthFlow"
					}`}
				>
					<LogoBanner />
					{withHeader && (
						<div className="space-y-2 text-center">
							<h1 className="font-semibold md:text-2xl">{heading}</h1>
							<p className="text-sm md:text-lg">{greeting}</p>
						</div>
					)}
					{children}
				</div>
			) : (
				<div className="my-auto w-full">{children}</div>
			)}
		</main>
	);
};
