import { DummyAvatar } from "@/components/common/campaign-icons";
import type { Donation } from "@/interfaces/Donation";
import { cn } from "@/lib";
import { getTimeDifference } from "@/lib/helpers/getTimeDiff";
import { useElementList } from "@/lib/hooks";
import { Button } from "../ui";

function DonorSection({
	className,
	donations,
}: {
	className?: string;
	donations?: Donation[];
}) {
	const [DonorList] = useElementList();

	return (
		<article className={cn("w-full space-y-8", className)}>
			{donations && donations?.length > 0 ? (
				<DonorList
					className="space-y-6"
					each={donations ?? []}
					render={(donation) => (
						<li key={donation?._id} className="flex items-center justify-between">
							<figure className="flex shrink-0 items-center gap-[6px]">
								<DummyAvatar className="size-[23px] lg:size-8" />

								<figcaption className="text-sm font-medium lg:text-base">
									{donation?.donorName}
								</figcaption>
							</figure>

							<p className="flex shrink-0 items-center gap-[5px] text-xs lg:text-sm">
								<span>sent</span>

								<span className="text-sm font-medium lg:text-base">
									+{donation?.amount?.toLocaleString("US")}
								</span>

								<span>{getTimeDifference(String(donation?.createdAt ?? "")) ?? "few mins ago"}</span>
							</p>
						</li>
					)}
				/>
			) : (
				<p className="text-center text-sm font-medium text-gray-500">No donations yet.</p>
			)}

			{donations?.length! > 0 && (
				<Button
					variant="secondary"
					className="w-full shrink-0 rounded-md border-abeg-primary py-2 text-base font-medium text-abeg-primary lg:rounded-lg"
				>
					See more
				</Button>
			)}
		</article>
	);
}

export default DonorSection;
