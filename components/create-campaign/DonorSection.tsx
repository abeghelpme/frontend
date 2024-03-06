import { cn } from "@/lib";
import { useElementList } from "@/lib/hooks";
import { DummyAvatar } from "@/public/assets/icons/campaign";
import { Button } from "../ui";

function DonorSection({ className }: { className?: string }) {
	const { For: DonorList } = useElementList();

	return (
		<article className={cn("w-full space-y-8", className)}>
			<ul className="space-y-6">
				<DonorList
					each={[...Array(6).keys()]}
					render={(count) => (
						<li key={count} className="flex items-center justify-between">
							<figure className="flex shrink-0 items-center gap-2">
								<DummyAvatar className="size-[26px] lg:size-8" />

								<figcaption className="text-sm font-medium lg:text-base">
									Jane Doe
								</figcaption>
							</figure>

							<p className="flex shrink-0 items-center gap-[6px] text-xs lg:text-sm">
								<span>sent</span>

								<span className="text-sm font-medium lg:text-base">
									+300,000
								</span>

								<span>4 mins ago</span>
							</p>
						</li>
					)}
				/>
			</ul>

			<Button
				variant="secondary"
				className="w-full shrink-0 rounded-md border-abeg-primary py-2 text-base font-medium text-abeg-primary lg:rounded-lg"
			>
				See more
			</Button>
		</article>
	);
}

export default DonorSection;
