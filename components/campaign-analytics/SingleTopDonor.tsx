import { AbegHelpLogoWhite } from "@/components/common";
import { ProgressBar } from "@/components/ui";

type Props = {
	name: string;
	type: string;
	donated: number;
	target: number;
};
const SingleTopDonor = ({ name, type, donated, target }: Props) => {
	return (
		<div className="rounded-xl border-CampaignCardBorderWidth border-placeholder p-4 md:p-6 flex flex-col gap-4 text-xs font-bold">
			<div className="flex gap-2 items-center">
				<AbegHelpLogoWhite />
				<div className="flex flex-col gap-1">
					<p className="text-sm">{name}</p>
					<p className="text-xs font-normal">{type}</p>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex  justify-between gap-2">
					<p>${donated}</p>
					<p>Target: ${target}</p>
				</div>
				<ProgressBar
					value={(donated / target) * 100}
					className="progress-filled:bg-abeg-primary"
				/>
			</div>
		</div>
	);
};
export default SingleTopDonor;
