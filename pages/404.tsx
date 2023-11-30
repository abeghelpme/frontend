import Image from "next/image";
import Link from "next/link";

import Button from "@/components/primitives/Button/button";

const NotFound = () => {
  return (
    <main className=" min-h-screen flex px-4 flex-col-reverse justify-center items-center bg-abeg-neutral-60 lg:flex-row">
      <section className="relative  flex flex-col gap-4 items-center justify-start lg:justify-center lg:w-1/2">
        <p className="text-2xl font-bold">Oooops!</p>
        <p className="text-lg font-semibold text-center">
          We can&apos;t seem to find the page you are looking for
        </p>
        <Link href="/">
          <Button className="" variant="primary">
            Go Home
          </Button>
        </Link>
      </section>
      <section className="relative flex items-center justify-center h-[15rem] md:h-[30rem] w-full lg:w-1/2">
        <Image
          src="/404.webp"
          alt=""
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
