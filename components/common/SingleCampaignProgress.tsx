import { ProgressBar } from "@/components/ui";
import { TotalDonors } from "./svg";

type SingleCampaignProgressProps = {
	amountRaised: number;
	goal: number;
	style2?: boolean;
};

const SingleCampaignProgress = ({
	amountRaised,
	goal,
	style2 = false,
}: SingleCampaignProgressProps) => {
	const donationProgress = Math.floor((amountRaised / goal) * 100);
	const remaining =
		amountRaised >= goal || goal == null ? 0 : Math.floor(goal - amountRaised);

	if (style2) {
		return (
			<Style2
				donationProgress={donationProgress}
				amountRaised={amountRaised}
				goal={goal}
				donors={0}
			/>
		);
	}
	return (
		<article className="pt-4 flex flex-col gap-2">
			<ProgressBar value={donationProgress} className="progress-unfilled:h-1" />
			<div className="flex items-center justify-between">
				<p className="text-abeg-primary text-xs font-semibold">
					₦ {amountRaised} raised
				</p>

				<p className="text-abeg-primary text-xs font-semibold ">
					₦ {remaining} remaining
				</p>
			</div>
		</article>
	);
};

export default SingleCampaignProgress;

const Style2 = ({
	donationProgress,
	amountRaised,
	goal,
	donors,
}: {
	donationProgress: number;
	amountRaised: number;
	goal: number;
	donors: number;
}) => {
	return (
		<article className="pt-4 flex flex-col gap-3">
			<div className="flex flex-col gap-3">
				<ProgressBar
					value={donationProgress}
					className="progress-unfilled:h-[14px]"
				/>
				<div className="flex items-center justify-between bor">
					<p className="text-sm font-semibold">{donationProgress}% Funded</p>
					<div className="flex gap-2 items-center">
						<TotalDonors className="size-8 md:size-10" />
						<p className="text-sm font-semibold ">{donors} total donors</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-4xl font-extrabold">₦ {amountRaised}</p>
				<span className="font-normal text-sm">Raised of ₦ {goal}</span>
			</div>
		</article>
	);
};
