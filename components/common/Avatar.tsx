import Image from "next/image";

const Avatar = () => {
	return (
		<div className="rounded-full p-2 py-[7px] w-[36px] aspect-square md:w-10 border flex items-center justify-center border-abeg-primary">
			<Image src="" alt="" />
			<span className="text-sm md:text-base">LN</span>
		</div>
	);
};

export default Avatar;
