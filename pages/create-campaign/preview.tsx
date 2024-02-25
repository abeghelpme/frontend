import { FormActionButton, Heading } from "@/components/create-campaign";
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

	const { stepOneData, stepTwoData, stepThreeData, fundraiserCategories } =
		useFormStore((state) => state);

	const campaignCategory = fundraiserCategories.find(
		(category) => category.id === stepOneData.categoryId
	)?.name;

	const campaignDeadline = getDateFromString(stepTwoData.deadline);

	const imageUrls = stepThreeData.photos.map((file) =>
		URL.createObjectURL(file)
	);

	return (
		<div className="mt-8 flex min-h-screen flex-col items-center justify-between lg:mt-12">
			<header className="mx-auto flex w-full flex-col gap-2 px-6 max-lg:max-w-[480px] lg:px-28 lg:text-2xl">
				<Heading as="h1" className="text-abeg-primary">
					Campaign Preview
				</Heading>

				<p className="text-abeg-primary">
					This is what your fundraiser campaign will look like to donors
				</p>
			</header>

			<main className="bg-contours-old mt-4 flex flex-col bg-cover px-6 pb-16 text-abeg-text max-lg:max-w-[480px] lg:mt-12 lg:px-28">
				<section className="flex flex-col gap-2 lg:gap-8">
					<Heading as="h2" className="text-xl lg:text-[32px]">
						{stepTwoData.title}
					</Heading>

					<div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
						<Image
							src={imageUrls[0] ?? "/"}
							alt="campaign cover image"
							className="aspect-[342/200] w-full min-w-[320px] rounded-lg lg:h-[400px] lg:rounded-[10px]"
							width={342}
							height={200}
							onLoad={() => URL.revokeObjectURL(imageUrls[0])}
						/>

						<article className="flex flex-col gap-7 px-6 py-3 lg:py-8">
							<div>
								<p className="lg:text-xl.4">₦ {stepTwoData.goal} goal</p>
								<span className="mt-2 block h-[0.6rem] rounded-lg bg-semiWhite" />
							</div>

							<div className="flex flex-col gap-4">
								<Button
									variant="primary"
									className="w-full rounded-md bg-abeg-primary px-6 py-3 text-xs font-bold lg:rounded-lg lg:text-base"
								>
									Donate to this campaign
								</Button>

								<Button
									variant="secondary"
									className="w-full rounded-md border-abeg-primary px-6 py-3 text-xs font-bold text-abeg-primary lg:rounded-lg lg:text-base"
								>
									Share this campaign
								</Button>
							</div>

							<div className="flex items-start gap-2 text-xs lg:text-base">
								<MoneyIcon className="mt-1 shrink-0 lg:mt-2 lg:size-6" />

								<p>
									Be the first to donate to this fundraiser, every penny donated
									will go a long way
								</p>
							</div>

							<div className="flex items-center gap-2 text-xs lg:text-base">
								<DummyAvatar className={"shrink-0 lg:size-8"} />

								<p>
									{stepTwoData.fundraiser || "Anonymous"} is in charge of this
									fundraiser.
								</p>
							</div>
						</article>
					</div>
				</section>

				<section className="mt-2 lg:mt-6 lg:max-w-[71.7rem]">
					<Heading
						as="h3"
						className="flex gap-4 border-b border-b-placeholder p-2"
					>
						Category:
						<span className="font-normal">{campaignCategory}</span>
					</Heading>

					<Heading
						as="h3"
						className="mt-3 border-b border-b-placeholder p-2 lg:mt-6"
					>
						Story
					</Heading>

					<div
						className="mt-6 min-h-16 lg:text-xl"
						dangerouslySetInnerHTML={{
							__html: stepThreeData.storyHtml,
						}}
					/>
				</section>

				<section className="mt-6 flex flex-col gap-6 border-b border-b-placeholder pb-4 lg:max-w-[71.7rem]">
					<Heading as="h2">See more pictures below:</Heading>

					<div className="flex flex-col items-center gap-6">
						<ImageFileList
							each={imageUrls.slice(1)}
							render={(url = "/") => (
								<Image
									key={url}
									className="h-52 w-64 rounded-md object-cover lg:h-80 lg:w-[32rem]"
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

					<ul className="grid grid-cols-5 justify-items-center gap-x-0 gap-y-6 lg:grid-cols-3">
						<TagList
							each={stepOneData.tags}
							render={(tag) => (
								<li className="font-medium lg:text-xl">#{tag}</li>
							)}
						/>
					</ul>
				</section>

				<section className="mt-8 flex items-start gap-4 lg:mt-12 lg:max-w-[71.7rem]">
					<DummyAvatar className="size-12 lg:size-[8.2rem]" />

					<div>
						<p className="flex flex-col lg:text-xl">
							{stepTwoData.fundraiser === "INDIVIDUAL" ? "You" : "Anonymous"}{" "}
							are in in charge of this fundraiser.
							<span className="mt-8">{stepOneData.country}</span>
						</p>

						<Button
							variant="secondary"
							className="mt-6 rounded-md border-abeg-primary px-4 py-3 text-sm font-bold text-abeg-primary lg:mt-8 lg:px-6 lg:py-4 lg:text-base"
						>
							Reach out
						</Button>
					</div>
				</section>
			</main>

			<footer className="lpx-6 mt-auto flex w-full justify-end gap-2 border-t border-t-abeg-primary px-6 py-4 lg:gap-4 lg:px-[100px] lg:py-6">
				<FormActionButton
					type="button"
					variant="secondary"
					className="border-abeg-primary font-bold text-abeg-primary"
				>
					<Link href={"/create-campaign"}>Edit campaign</Link>
				</FormActionButton>

				<FormActionButton type="button" className="bg-abeg-primary font-bold">
					Create Campaign
				</FormActionButton>
			</footer>
		</div>
	);
}

export default Preview;
