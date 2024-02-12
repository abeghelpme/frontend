import { ProgressBar } from "@/components/ui";
import Image from "next/image";
import React from "react";
import CountryDonor from "./CountryDonor";
import template from "./flag.png";

const TotalDonors = () => {
	return (
		<div className="flex flex-col gap-3 flex-1  ">
			<p className=" text-2xl md:text-4xl font-semibold">10.8K</p>
			<div className="parent-to-make-a-compontnet flex flex-col gap-2">
				<CountryDonor />
				<CountryDonor />
				<CountryDonor />
				<CountryDonor />
				<CountryDonor />
				<CountryDonor />
				<CountryDonor />
			</div>
		</div>
	);
};

export default TotalDonors;
