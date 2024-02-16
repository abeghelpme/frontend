import {
	CameroonFlag,
	GambiaFlag,
	GhanaFlag,
	LiberiaFlag,
	MaliFlag,
	NigeriaFlag,
} from "@/components/Shared";
import { ProgressBar } from "@/components/ui";

type CountryData = {
	country: "Nigeria" | "Ghana" | "Mali" | "Liberia" | "Cameroon" | "Gambia";
	flag: JSX.Element;
};

type CountryMap = {
	[key: string]: CountryData;
};

type Country = {
	countryName: string;
	progress: number;
};

const Countries: CountryMap = {
	Nigeria: {
		country: "Nigeria",
		flag: <NigeriaFlag />,
	},
	Ghana: {
		country: "Ghana",
		flag: <GhanaFlag />,
	},
	Mali: {
		country: "Mali",
		flag: <MaliFlag />,
	},
	Liberia: {
		country: "Liberia",
		flag: <LiberiaFlag />,
	},
	Cameroon: {
		country: "Cameroon",
		flag: <CameroonFlag />,
	},
	Gambia: {
		country: "Gambia",
		flag: <GambiaFlag />,
	},
};

const SingleCountryDonor = ({ countryName, progress }: Country) => {
	const { country, flag } = Countries[countryName];
	return (
		<div className="flex gap-3 items-center">
			<div className="rounded-full overflow-hidden w-10 aspect-square">
				{flag}
			</div>
			<div className="flex-1 flex flex-col">
				<p className="text-sm font-normal">{country}</p>
				<div className="flex gap-2 justify-center items-center  ">
					<ProgressBar
						value={progress}
						className="progress-filled:bg-abeg-teal"
					/>
					<p className="text-sm font-normal">{progress}%</p>
				</div>
			</div>
		</div>
	);
};

export default SingleCountryDonor;
