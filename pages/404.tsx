import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className=" min-h-screen flex px-4 flex-col-reverse justify-center bg-abeg-neutral-60 lg:flex-row">
      <section className="relative flex-1 flex flex-col gap-4 items-center justify-start lg:justify-center lg:w-1/2">
        <p className="text-2xl font-bold">Oooops!</p>
        <p className="text-lg font-semibold text-center">
          We can&apos;t seem to find the page you are looking for
        </p>
        <Link href="/">
          <button className="bg-abeg-green h-[3rem] focus:outline-none focus:ring  focus:ring-abeg-neutral-70 px-4 py-[0.875rem]  flex items-center justify-center rounded-[0.5rem] text-abeg-neutral-70">
            Go Home
          </button>
        </Link>
      </section>
      <section className="relative flex-1 lg:w-1/2">
        <Image
          src="/404.webp"
          alt="404 page image illustration"
          sizes="(min-width: 808px) 50vw, 100vw"
          priority
          fill
          className="w-full h-auto"
        />
      </section>
    </main>
  );
};
export default NotFound;
