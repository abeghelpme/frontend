import Image from "next/image";

type AvatarProps = {
	initials: string;
	src?: string;
	alt?: string;
};
const Avatar = ({ src, alt, initials }: AvatarProps) => {
	return (
		<div className="cursor-pointer rounded-full p-2 py-[7px] w-[36px] aspect-square md:w-10 border flex items-center justify-center border-abeg-primary">
			{src && <Image src={src as string} alt={alt as string} />}
			<span className="text-sm md:text-base">{initials || "AH"}</span>
		</div>
	);
};

export default Avatar;
