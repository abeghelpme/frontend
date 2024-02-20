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
			<main className="bg-contours-old px-@2.4 pb-@6.2 text-abeg-text lg:mt-@4.8 lg:px-@10 mt-4 flex flex-col bg-cover max-lg:max-w-[48rem]">
				<section className="gap-@0.8 lg:gap-@3.2 flex flex-col">
					<Heading as="h2" className="text-xl lg:text-3xl">
						{stepTwoData.title}
					</Heading>

					<div className="gap-@0.8 lg:gap-@1.8 flex flex-col lg:flex-row">
						<Image
							src={imageUrls[0] ?? "/"}
							alt="campaign cover image"
							className="aspect-[342/200] w-full min-w-[32rem] rounded-lg lg:h-[40rem] lg:rounded-[10px]"
							width={342}
							height={200}
							onLoad={() => URL.revokeObjectURL(imageUrls[0])}
						/>

						<article className="gap-@2.8 px-@2.4 lg:py-@3.2 flex flex-col py-3">
							<div>
								<p className="lg:text-xl.4">₦ {stepTwoData.goal} goal</p>
								<span className="mt-@0.8 bg-semiWhite block h-[0.6rem] rounded-lg" />
							</div>

							<div className="gap-@1.6 flex flex-col">
								<Button
									variant="primary"
									className="bgabeg-primary px-@2.4 py-@1.2 w-full rounded-md text-xs font-bold lg:rounded-lg lg:text-base"
								>
									Donate to this campaign
								</Button>

								<Button
									variant="secondary"
									className="borderabeg-primary px-@2.4 py-@1.2 textabeg-primary w-full rounded-md text-xs font-bold lg:rounded-lg lg:text-base"
								>
									Share this campaign
								</Button>
							</div>

							<div className="gap-@0.8 flex items-start text-xs lg:text-base">
								<MoneyIcon className="mt-@0.4 lg:mt-@0.8 lg:size-@2.4 shrink-0" />

								<p>
									Be the first to donate to this fundraiser, every penny donated
									will go a long way
								</p>
							</div>

							<div className="gap-@0.8 flex items-center text-xs lg:text-base">
								<DummyAvatar className={"lg:size-@3.2 shrink-0"} />

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
						className="gap-@1.6 border-b-placeholder p-@0.8 flex border-b"
					>
						Category:
						<span className="font-normal">{stepOneData.categoryId}</span>
					</Heading>

					<Heading
						as="h3"
						className="mt-@1.2 border-b-placeholder p-@0.8 lg:mt-@2.4 border-b"
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

				<section className="mt-@2.4 gap-@2.4 border-b-placeholder pb-@1.6 flex flex-col border-b lg:max-w-[71.7rem]">
					<Heading as="h2">See more pictures below:</Heading>

					<div className="gap-@2.3 flex flex-col items-center">
						<ImageFileList
							each={imageUrls.slice(1)}
							render={(url = "/") => (
								<Image
									key={url}
									className="h-@20 w-@25 lg:h-@32.4 lg:w-@50.5 rounded-md object-cover"
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

					<ul className="grid-cols-@2 gap-y-@2.4 grid justify-items-center gap-x-0 lg:grid-cols-3">
						<TagList
							each={stepOneData.tags}
							render={(tag) => (
								<li className="font-medium lg:text-xl">#{tag}</li>
							)}
						/>
					</ul>
				</section>

				<section className="mt-@3.2 gap-@1.6 lg:mt-@4.8 flex items-start lg:max-w-[71.7rem]">
					<DummyAvatar className="size-@4.8 lg:size-[8.2rem]" />

					<div>
						<p className="flex flex-col lg:text-xl">
							{stepTwoData.fundraiser === "INDIVIDUAL" ? "You" : "Anonymous"}{" "}
							are in in charge of this fundraiser.
							<span className="mt-8">{stepOneData.country}</span>
						</p>

						<Button
							variant="secondary"
							className="mt-@2.4 borderabeg-primary px-@1.6 py-@1.2 textabeg-primary lg:mt-@3.2 lg:px-@2.4 lg:py-@1.6 rounded-md text-sm font-bold lg:text-base"
						>
							Reach out
						</Button>
					</div>
				</section>
			</main>

			<footer className="gap-@0.8 border-tabeg-primary px-@2.4 py-@1.6 lg:gap-@1.6 lg:px-@10 mt-auto flex w-full justify-end border-t lg:py-[2.65rem]">
				<FormActionButton
					type="button"
					variant="secondary"
					className="borderabeg-primary textabeg-primary font-bold"
				>
					<Link href={"/create-campaign"}>Edit campaign</Link>
				</FormActionButton>

				<FormActionButton type="button" className="bgabeg-primary font-bold">
					Create Campaign
				</FormActionButton>
			</footer>
		</div>
	);
}

export default Preview;
