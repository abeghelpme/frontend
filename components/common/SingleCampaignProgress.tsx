import { ProgressBar } from "@/components/ui";

type SingleCampaignProgressProps = {
	amountRaised: number;
	goal: number;
};
const SingleCampaignProgress = ({
	amountRaised,
	goal,
}: SingleCampaignProgressProps) => {
	const donationProgress = Math.floor((amountRaised / goal) * 100);
	const remaining = amountRaised >= goal ? 0 : Math.floor(goal - amountRaised);
	//   console.log(
	//     "amount raised:",
	//     amountRaised,
	//     "goal:",
	//     goal,
	//     "remaining",
	//     remaining
	//   );

	return (
		<article>
			<div className="flex items-center justify-between">
				<p className="font-bold">₦ {amountRaised}</p>

				<p className="text-xs font-semibold ">
					₦ {remaining}
					<span className="text-placeholder"> remaining</span>
				</p>
			</div>

			<ProgressBar value={donationProgress} className="progress-unfilled:h-1" />
		</article>
	);
};
export default SingleCampaignProgress;
