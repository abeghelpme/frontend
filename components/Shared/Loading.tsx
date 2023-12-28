import logo from "@/public/assets/images/shared/logo.svg";
import Image from "next/image";

type CompProp = {
  message?: string;
};
const LoadingComp = ({ message }: CompProp) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-full overflow-hidden w-full text-abeg-teal-10 font-medium">
      <div className="flex items-center justify-center gap-2">
        <Image
          className="w-[35px] md:w-[40px] lg:w-[46px] lg:aspect-square"
          src={logo as string}
          priority
          alt=""
        />
        <span role="" className="">
          AbegHelp.me
        </span>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default LoadingComp;
