import { ProgressBar } from "@/components/ui";
import Image from "next/image";
import React from "react";
import template from "./flag.png";

const CountryDonor = () => {
	return (
		<div className="flex gap-3 items-center">
			<Image
				alt="flag"
				src={template}
				className="aspect-square w-8 rounded-[50%] object-cover object-center  "
			/>
			<div className="flex-1 flex flex-col">
				<p className="text-sm font-normal">Country</p>
				<div className="flex gap-2 justify-center items-center  ">
					<ProgressBar value={21} className="progress-filled:bg-abeg-teal" />
					<p className="text-sm font-normal">21%</p>
				</div>
			</div>
		</div>
	);
};

export default CountryDonor;
