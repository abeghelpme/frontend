import { Heading } from "@/components/CreateCampaign";
import { getDateFromString } from "@/components/CreateCampaign/campaign-utils";
import { Button } from "@/components/ui";
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
		<div className="flex min-h-screen flex-col justify-between">
			<header className="mx-auto flex w-[min(100%,48rem)] flex-col gap-0.8 px-2.4 pt-3.2 lg:w-full lg:px-10 lg:pt-4.8">
				<Heading as="h1">Campaign Preview</Heading>

				<p className="text-1.4 text-formBtn lg:text-2.4">
					This is what your fundraiser campaign will look like to donors
				</p>
			</header>

			<main
				className="mx-auto mt-3.2 flex flex-col bg-contours-old bg-cover px-2.4 pb-6.2 text-successText max-lg:max-w-[48rem] lg:px-10"
				data-rem-reset
			>
				<section className="flex flex-col gap-0.8 lg:gap-3.2">
					<Heading as="h2" className="text-2 lg:text-3.2">
						{stepTwoData.title}
					</Heading>

					<div className="flex flex-col gap-0.8 lg:flex-row lg:gap-1.8">
						<Image
							src={imageUrls[0] ?? "/"}
							alt="campaign cover image"
							className="aspect-[342/200] w-full min-w-[32rem] rounded-8 lg:h-[40rem] lg:rounded-10"
							width={342}
							height={200}
						/>

						<article className="flex flex-col gap-2.8 px-2.4 py-3 lg:py-3.2">
							<div>
								<p className="lg:text-2.4">₦ {stepTwoData.goal} goal</p>
								<span className="mt-0.8 block h-[0.6rem] rounded-8 bg-semiWhite" />
							</div>

							<div className="flex flex-col gap-1.6">
								<Button
									variant="primary"
									className="w-full rounded-6 bg-formBtn px-2.4 py-1.2 text-1.2 font-bold lg:rounded-8 lg:text-1.6"
								>
									Donate to this campaign
								</Button>

								<Button
									variant="secondary"
									className="w-full rounded-6 border-formBtn px-2.4 py-1.2 text-1.2 font-bold text-formBtn lg:rounded-8 lg:text-1.6"
								>
									Share this campaign
								</Button>
							</div>

							<div className="flex items-start gap-0.8 text-1.2 lg:text-1.6">
								<MoneyIcon className="mt-0.4 shrink-0 lg:mt-0.8 lg:size-2.4" />

								<p>
									Be the first to donate to this fundraiser, every penny donated
									will go a long way
								</p>
							</div>

							<div className="flex items-center gap-0.8 text-1.2 lg:text-1.6">
								<DummyAvatar className={"shrink-0 lg:size-3.2"} />

								<p>
									{stepTwoData.fundraiser || "Anonymous"} is in charge of this
									fundraiser.
								</p>
							</div>
						</article>
					</div>
				</section>

				<section className="mt-0.8 lg:mt-2.4 lg:max-w-[71.7rem]">
					<Heading
						as="h3"
						className="flex gap-1.6 border-b border-b-placeholder p-0.8"
					>
						Category:
						<span className="font-normal">{stepOneData.categoryId}</span>
					</Heading>

					<Heading
						as="h3"
						className="mt-1.2 border-b border-b-placeholder p-0.8 lg:mt-2.4"
					>
						Story
					</Heading>

					<div
						className="mt-2.4 min-h-7 lg:text-2"
						dangerouslySetInnerHTML={{
							__html: stepThreeData.storyHtml,
						}}
					/>
				</section>

				<section className="mt-2.4 flex flex-col gap-2.4 border-b border-b-placeholder pb-1.6 lg:max-w-[71.7rem]">
					<Heading as="h2">See more pictures below:</Heading>

					<div className="flex flex-col items-center gap-2.3">
						<ImageFileList
							each={imageUrls.slice(1)}
							render={(url = "/") => (
								<Image
									key={url}
									className="h-20 w-25 rounded-6 object-cover lg:h-32.4 lg:w-50.5"
									src={url}
									alt="extra campaign images"
									width={250}
									height={200}
								/>
							)}
						/>
					</div>

					<p className="text-2.4">
						Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
					</p>

					<ul className="grid grid-cols-2 justify-items-center gap-x-0 gap-y-2.4 lg:grid-cols-3">
						<TagList
							each={stepOneData.tags}
							render={(tag) => (
								<li className="font-medium lg:text-2">#{tag}</li>
							)}
						/>
					</ul>
				</section>

				<section className="mt-3.2 flex items-start gap-1.6 lg:mt-4.8 lg:max-w-[71.7rem]">
					<DummyAvatar className="size-4.8 lg:size-[8.2rem]" />

					<div>
						<p className="flex flex-col lg:text-2">
							{stepTwoData.fundraiser === "INDIVIDUAL" ? "You" : "Anonymous"}{" "}
							are in in charge of this fundraiser.
							<span className="mt-8">{stepOneData.country}</span>
						</p>

						<Button
							variant="secondary"
							className="mt-2.4 rounded-6 border-formBtn px-1.6 py-1.2 text-1.4 font-bold text-formBtn lg:mt-3.2 lg:px-2.4 lg:py-1.6 lg:text-1.6"
						>
							Reach out
						</Button>
					</div>
				</section>
			</main>

			<footer className="mt-auto flex justify-end gap-0.8 border-t border-t-formBtn px-2.4 py-1.6 lg:gap-1.6 lg:px-10 lg:py-[2.65rem]">
				<Button
					variant="secondary"
					className="rounded-6 border-formBtn px-1.2 py-0.8 text-1.2 font-bold text-formBtn lg:px-2.4 lg:py-1.6 lg:text-1.4"
				>
					<Link href={"/create-campaign"}>Edit campaign</Link>
				</Button>

				<Button
					variant="primary"
					className="rounded-6 bg-formBtn px-1.2 py-0.8 text-1.2 font-bold lg:px-2.4 lg:py-1.6 lg:text-1.4"
				>
					Create Campaign
				</Button>
			</footer>
		</div>
	);
}

export default Preview;
