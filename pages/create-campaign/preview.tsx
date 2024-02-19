import { FormActionButton, Heading } from "@/components/CreateCampaign";
import { Button } from "@/components/ui";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useElementList } from "@/lib/hooks";
import { DummyAvatar, MoneyIcon } from "@/public/assets/icons/campaign";
import { useFormStore } from "@/store/formStore";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function Preview() {
	const { For: ImageFileList } = useElementList();
	const { For: TagList } = useElementList();

	const { stepOneData, stepTwoData, stepThreeData } = useFormStore(
		(state) => state
	);

	const imageUrls = stepThreeData.photos.map((file) =>
		URL.createObjectURL(file)
	);

	const campaignDeadline = getDateFromString(stepTwoData.deadline);

	return (
		<div className="flex min-h-screen flex-col items-center justify-between">
			<main className="mt-4 flex flex-col bg-contours-old bg-cover px-@2.4 pb-@6.2 text-successText max-lg:max-w-[48rem] lg:mt-@4.8 lg:px-@10">
				<section className="flex flex-col gap-@0.8 lg:gap-@3.2">
					<Heading as="h2" className="text-xl lg:text-3xl">
						{stepTwoData.title}
					</Heading>

					<div className="flex flex-col gap-@0.8 lg:flex-row lg:gap-@1.8">
						<Image
							src={imageUrls[0] ?? "/"}
							alt="campaign cover image"
							className="aspect-[342/200] w-full min-w-[32rem] rounded-lg lg:h-[40rem] lg:rounded-[10px]"
							width={342}
							height={200}
							onLoad={() => URL.revokeObjectURL(imageUrls[0])}
						/>

						<article className="flex flex-col gap-@2.8 px-@2.4 py-3 lg:py-@3.2">
							<div>
								<p className="lg:text-xl.4">₦ {stepTwoData.goal} goal</p>
								<span className="mt-@0.8 block h-[0.6rem] rounded-lg bg-semiWhite" />
							</div>

							<div className="flex flex-col gap-@1.6">
								<Button
									variant="primary"
									className="w-full rounded-md bg-formBtn px-@2.4 py-@1.2 text-xs font-bold lg:rounded-lg lg:text-base"
								>
									Donate to this campaign
								</Button>

								<Button
									variant="secondary"
									className="w-full rounded-md border-formBtn px-@2.4 py-@1.2 text-xs font-bold text-formBtn lg:rounded-lg lg:text-base"
								>
									Share this campaign
								</Button>
							</div>

							<div className="flex items-start gap-@0.8 text-xs lg:text-base">
								<MoneyIcon className="mt-@0.4 shrink-0 lg:mt-@0.8 lg:size-@2.4" />

								<p>
									Be the first to donate to this fundraiser, every penny donated
									will go a long way
								</p>
							</div>

							<div className="flex items-center gap-@0.8 text-xs lg:text-base">
								<DummyAvatar className={"shrink-0 lg:size-@3.2"} />

								<p>
									{stepTwoData.fundraiser || "Anonymous"} is in charge of this
									fundraiser.
								</p>
							</div>
						</article>
					</div>
				</section>

				<section className="mt-@0.8 lg:mt-@2.4 lg:max-w-[71.7rem]">
					<Heading
						as="h3"
						className="flex gap-@1.6 border-b border-b-placeholder p-@0.8"
					>
						Category:
						<span className="font-normal">{stepOneData.categoryId}</span>
					</Heading>

					<Heading
						as="h3"
						className="mt-@1.2 border-b border-b-placeholder p-@0.8 lg:mt-@2.4"
					>
						Story
					</Heading>

					<div
						className="mt-@2.4 min-h-@7 lg:text-xl"
						dangerouslySetInnerHTML={{
							__html: stepThreeData.storyHtml,
						}}
					/>
				</section>

				<section className="mt-@2.4 flex flex-col gap-@2.4 border-b border-b-placeholder pb-@1.6 lg:max-w-[71.7rem]">
					<Heading as="h2">See more pictures below:</Heading>

					<div className="flex flex-col items-center gap-@2.3">
						<ImageFileList
							each={imageUrls.slice(1)}
							render={(url = "/") => (
								<Image
									key={url}
									className="h-@20 w-@25 rounded-md object-cover lg:h-@32.4 lg:w-@50.5"
									src={url}
									alt="extra campaign images"
									width={250}
									height={200}
									onLoad={() => URL.revokeObjectURL(url)}
								/>
							)}
						/>
					</div>

					<p className="lg:text-xl.4">
						Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
					</p>

					<ul className="grid-cols-@2 grid justify-items-center gap-x-0 gap-y-@2.4 lg:grid-cols-3">
						<TagList
							each={stepOneData.tags}
							render={(tag) => (
								<li className="font-medium lg:text-xl">#{tag}</li>
							)}
						/>
					</ul>
				</section>

				<section className="mt-@3.2 flex items-start gap-@1.6 lg:mt-@4.8 lg:max-w-[71.7rem]">
					<DummyAvatar className="size-@4.8 lg:size-[8.2rem]" />

					<div>
						<p className="flex flex-col lg:text-xl">
							{stepTwoData.fundraiser === "INDIVIDUAL" ? "You" : "Anonymous"}{" "}
							are in in charge of this fundraiser.
							<span className="mt-8">{stepOneData.country}</span>
						</p>

						<Button
							variant="secondary"
							className="mt-@2.4 rounded-md border-formBtn px-@1.6 py-@1.2 text-sm font-bold text-formBtn lg:mt-@3.2 lg:px-@2.4 lg:py-@1.6 lg:text-base"
						>
							Reach out
						</Button>
					</div>
				</section>
			</main>

			<footer className="mt-auto flex w-full justify-end gap-@0.8 border-t border-t-formBtn px-@2.4 py-@1.6 lg:gap-@1.6 lg:px-@10 lg:py-[2.65rem]">
				<FormActionButton
					type="button"
					variant="secondary"
					className="border-formBtn font-bold text-formBtn"
				>
					<Link href={"/create-campaign"}>Edit campaign</Link>
				</FormActionButton>

				<FormActionButton type="button" className="bg-formBtn font-bold">
					Create Campaign
				</FormActionButton>
			</footer>
		</div>
	);
}

export default Preview;
