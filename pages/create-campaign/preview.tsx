import { CustomDialog, PageMetaData } from "@/components/common";
import { FormActionButton, Heading } from "@/components/create-campaign";
import { Button, ProgressBar } from "@/components/ui";
import type { Campaign } from "@/interfaces/Campaign";
import {
	DATE_NEXT_TOMORROW,
	callApi,
	getDateFromString,
} from "@/lib/helpers/campaign";
import { useCopyToClipboard, useElementList } from "@/lib/hooks";
import {
	DummyAvatar,
	MoneyIcon,
	whatsappIcon,
	xIcon,
} from "@/public/assets/icons/campaign";
import { useFormStore } from "@/store/formStore";
import { useInitFormStore } from "@/store/formStore/formStore";
import { format } from "date-fns";
import { FilesIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

void useInitFormStore.getState().actions.initializeFormData();

function generateTweet(
	campaignTitle: string,
	campaignUrl: string,
	hashtags: string[]
) {
	const queryParams = new URLSearchParams();

	queryParams.append(
		"text",
		`Abeg help donate to my campaign:
${campaignTitle}
${hashtags.length > 0 && hashtags.join(", ")}`
	);

	queryParams.append("url", campaignUrl);
	queryParams.append("via", "abeghelpme");

	return `https://twitter.com/intent/tweet?${queryParams.toString()}`;
}

function generateWhatsAppMessage(campaignTitle: string, campaignUrl: string) {
	const queryParams = new URLSearchParams();

	queryParams.append(
		"text",
		`Abeg help donate to my campaign:\n${campaignTitle}\n${campaignUrl}`
	);

	return `https://wa.me/?${queryParams.toString()}`;
}

function Preview() {
	const { stepOneData, stepTwoData, stepThreeData, campaignInfo } =
		useFormStore((state) => state);
	const { For: ImageFileList } = useElementList();
	const { For: TagList } = useElementList();
	const { copyToClipboard } = useCopyToClipboard();

	const campaignCategory = campaignInfo.categories.find(
		(category) => category.id === stepOneData.categoryId
	)?.name;

	const fundraiserTarget =
		stepTwoData.fundraiser === "INDIVIDUAL"
			? `${campaignInfo.creator.firstName} ${campaignInfo.creator.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(
		stepTwoData.deadline,
		DATE_NEXT_TOMORROW
	);

	const imageUrls =
		stepThreeData.photos.length > 0
			? stepThreeData.photos.map((file) => URL.createObjectURL(file))
			: ["/"];

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleRevokeUrl = (imageUrl: string) => () =>
		URL.revokeObjectURL(imageUrl);

	const handleShareLink = () => {
		copyToClipboard(`https://abeghelp.me/${campaignInfo.url}`);

		toast.success("Campaign link copied to clipboard!", {
			duration: 1500,
		});
	};

	const handlePublish = async () => {
		const { data, error } = await callApi<Campaign>("/campaign/publish", {
			campaignId: campaignInfo.id,
		});

		if (error) {
			toast.error(error.message);
		}
	};

	const exeerpt = /^([\S\s]{1,150}[!.?])/.exec(stepThreeData.story)?.[0];

	return (
		<div className="mt-8 flex min-h-screen flex-col items-center justify-between lg:mt-12">
			<PageMetaData
				title={stepTwoData.title}
				content={exeerpt ?? ""}
				image={imageUrls[0]}
				url={`https://abeghelp.me/${campaignInfo.url}`}
			/>

			<header className="flex w-full flex-col gap-2 px-6 max-lg:max-w-[480px] lg:px-[100px] lg:text-2xl">
				<Heading as="h1" className="text-abeg-primary">
					Campaign Preview
				</Heading>

				<p className="text-abeg-primary">
					This is what your fundraiser campaign will look like to donors
				</p>

				<p className="text-xl text-abeg-error-20">
					Note: Your campaign will become visible to donors once published and
					cannot be edited after!
				</p>

				<FormActionButton
					type="button"
					className="w-[20vw] bg-abeg-primary font-bold"
					onClick={() => {}}
				>
					Publish Campaign
				</FormActionButton>
			</header>

			<main className="mt-8 bg-cover px-6 pb-16 text-abeg-text max-lg:max-w-[480px] lg:mt-12 lg:px-[100px]">
				<section>
					<Heading as="h2" className="text-xl lg:text-[32px]">
						{stepTwoData.title?.[0]
							? `${stepTwoData.title[0].toUpperCase()}${stepTwoData.title.slice(
									1
							  )}`
							: "No Title"}
					</Heading>

					<div className="mt-2 flex flex-col gap-2 lg:mt-8 lg:flex-row lg:gap-5">
						<Image
							src={imageUrls[0]}
							alt="campaign cover image"
							className="aspect-[342/200] w-full min-w-[320px] rounded-lg object-cover lg:h-[400px] lg:max-w-[717px] lg:rounded-[10px]"
							width={342}
							height={200}
							onLoad={handleRevokeUrl(imageUrls[0])}
						/>

						<article className="space-y-7 px-6 py-3 lg:py-8">
							<div>
								<p className="lg:text-2xl">₦ {stepTwoData.goal} goal</p>

								<ProgressBar
									value={0}
									className="mt-2 progress-unfilled:h-1 progress-unfilled:rounded-lg progress-unfilled:bg-lightGreen progress-filled:rounded-lg progress-filled:bg-abeg-primary"
								/>
							</div>

							<div className="space-y-4">
								<Button
									variant="primary"
									className="w-full rounded-md bg-abeg-primary py-3 text-xs font-bold lg:rounded-lg lg:text-base"
								>
									Donate to this campaign
								</Button>

								<CustomDialog
									classNames={{
										content: "gap-0 max-lg:max-w-[476] p-12 md:p-12",
									}}
									trigger={
										<Button
											variant="secondary"
											className="w-full rounded-md border-abeg-primary py-3 text-xs font-bold text-abeg-primary lg:rounded-lg lg:text-base"
										>
											Share this campaign
										</Button>
									}
								>
									<p className="text-center">
										Spread the word, share your campaign with friends, family,
										and the world. Every share brings us one step closer to
										making a difference
									</p>

									<div className="mt-6 flex w-full items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
										<div className="flex w-full gap-1">
											<LinkIcon className="size-5" />
											<p>{`https://abeghelp.me/${campaignInfo.url}`}</p>
										</div>

										<button
											className="flex shrink-0 gap-1 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
											onClick={handleShareLink}
										>
											<FilesIcon className="size-4" />
											Copy link
										</button>
									</div>

									<div className="mt-6 flex w-full items-center justify-between gap-4 text-base">
										<hr className="my-1 basis-full border border-placeholder" />
										<p className="shrink-0">or share on</p>
										<hr className="my-1 basis-full border border-placeholder" />
									</div>

									<div className="mt-6 flex w-full items-center justify-between">
										<Link
											href={generateTweet(
												stepTwoData.title,
												`https://abeghelp.me/${campaignInfo.url}`,
												stepOneData.tags
											)}
											target="_blank"
											className="flex w-full items-center gap-2"
										>
											<Image
												src={xIcon as string}
												width={32}
												height={32}
												alt=""
											/>
											Twitter (X)
										</Link>

										<Link
											href={generateWhatsAppMessage(
												stepTwoData.title,
												`https://abeghelp.me/${campaignInfo.url}`
											)}
											target="_blank"
											className="flex w-full items-center justify-end gap-2"
										>
											<Image
												src={whatsappIcon as string}
												width={32}
												height={32}
												alt=""
											/>
											Whatsapp
										</Link>
									</div>
								</CustomDialog>
							</div>

							<div className="space-y-7">
								<figure className="flex items-start gap-[12px] text-xs lg:gap-4 lg:text-base">
									<MoneyIcon className="mt-1 shrink-0 lg:mt-2 lg:size-6" />

									<figcaption>
										Be the first to donate to this fundraiser, every penny
										donated will go a long way
									</figcaption>
								</figure>

								<figure className="flex items-center gap-2 text-xs lg:text-base">
									<DummyAvatar className={"shrink-0 lg:size-8"} />

									<figcaption>
										{fundraiserTarget} is in charge of this fundraiser.
									</figcaption>
								</figure>
							</div>
						</article>
					</div>
				</section>

				<section className="mt-2 flex flex-col gap-6 lg:mt-6 lg:max-w-[717px]">
					<article>
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
					</article>

					<article className="flex flex-col gap-6 border-b border-b-placeholder pb-4">
						<Heading as="h2">See more pictures below:</Heading>

						<div className="flex flex-col items-center gap-6">
							<ImageFileList
								each={imageUrls.slice(1)}
								render={(url) => (
									<Image
										key={url}
										className="h-52 w-64 rounded-md object-cover lg:h-80 lg:w-[32rem]"
										src={url}
										alt="extra campaign images"
										width={250}
										height={200}
										onLoad={handleRevokeUrl(url)}
									/>
								)}
							/>
						</div>

						<p className="lg:text-2xl">
							Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
						</p>

						<ul className="grid grid-cols-2 gap-x-0 gap-y-6 text-sm font-medium lg:grid-cols-3 lg:text-xl">
							<TagList
								each={stepOneData.tags}
								render={(tag, index) => (
									<li key={`${tag}-${index}`} className="flex min-w-0">
										#<p className="truncate">{tag}</p>
									</li>
								)}
							/>
						</ul>
					</article>
				</section>

				<section className="mt-8 flex items-start gap-4 lg:mt-12 lg:max-w-[717px]">
					<DummyAvatar className="size-12 lg:size-[82px]" />

					<div>
						<p className="flex flex-col lg:text-xl">
							{fundraiserTarget} is in charge of this fundraiser.
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
		</div>
	);
}

export default Preview;
Preview.protect = true;
