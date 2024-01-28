import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
	return (
		<main className="flex min-h-screen flex-col-reverse items-center justify-center bg-abeg-neutral-60 px-4 lg:flex-row">
			<section className="relative  flex flex-col items-center justify-start gap-4 lg:w-1/2 lg:justify-center">
				<p className="text-2xl font-bold">Oooops!</p>
				<p className="text-center text-lg font-semibold">
					We can&apos;t seem to find the page you are looking for
				</p>
				<Link
					href="/"
					className="rounded-lg bg-abeg-neutral-20 px-5 py-2 text-sm font-medium text-white"
				>
					Go Home
				</Link>
			</section>
			<section className="relative flex h-[15rem] w-full items-center justify-center md:h-[30rem] lg:w-1/2">
				<Image
					src="/404.webp"
					alt=""
					sizes="(min-width: 808px) 50vw, 100vw"
					priority
					fill
					className="h-auto w-full"
				/>
			</section>
		</main>
	);
};
export default NotFound;
