import { CustomDialog, Success } from "@/components/common";
import { FormActionButton, Heading } from "@/components/create-campaign";
import { Button } from "@/components/ui";
import { DATE_NEXT_TOMORROW, getDateFromString } from "@/lib/helpers/campaign";
import { useCopyToClipboard, useElementList } from "@/lib/hooks";
import { DummyAvatar, MoneyIcon } from "@/public/assets/icons/campaign";
import { useFormStore } from "@/store/formStore";
import { useInitFormStore } from "@/store/formStore/formStore";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";

void useInitFormStore.getState().actions.initializeFormData();

function Preview() {
	const { stepOneData, stepTwoData, stepThreeData, campaignInfo } = useFormStore((state) => state);
	const { For: ImageFileList } = useElementList();
	const { For: TagList } = useElementList();
	const { copyToClipboard } = useCopyToClipboard();
	const router = useRouter();

	const campaignCategory = campaignInfo.categories.find(
		(category) => category.id === stepOneData.categoryId
	)?.name;

	const fundraiserTarget =
		stepTwoData.fundraiser === "INDIVIDUAL"
			? `${campaignInfo.creator.firstName} ${campaignInfo.creator.lastName}`
			: "BENEFICIARY";

	const campaignDeadline = getDateFromString(stepTwoData.deadline, DATE_NEXT_TOMORROW);

	const imageUrls =
		stepThreeData.photos.length > 0
			? stepThreeData.photos.map((file) => URL.createObjectURL(file))
			: ["/"];

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const handleRevokeUrl = (imageUrl: string) => () => URL.revokeObjectURL(imageUrl);

	const handleShareLink = () => {
		copyToClipboard(campaignInfo.url);

		toast.success("Link copied to clipboard", {
			duration: 1500,
		});

		void router.push(`/${campaignInfo.url}`, undefined, { shallow: true });
	};

	return (
		<div className="mt-8 flex min-h-screen flex-col items-center justify-between lg:mt-12">
			<header className="flex w-full flex-col gap-2 px-6 max-lg:max-w-[480px] lg:px-28 lg:text-2xl">
				<Heading as="h1" className="text-abeg-primary">
					Campaign Preview
				</Heading>

				<p className="text-abeg-primary">
					This is what your fundraiser campaign will look like to donors
				</p>
			</header>

			<main className="mt-4 flex flex-col bg-cover px-6 pb-16 text-abeg-text max-lg:max-w-[480px] lg:mt-12 lg:px-28">
				<section className="flex flex-col gap-2 lg:gap-8">
					<Heading as="h2" className="text-xl lg:text-[32px]">
						{stepTwoData.title[0]
							? `${stepTwoData.title[0].toUpperCase()}${stepTwoData.title.slice(1)}`
							: "No Title"}
					</Heading>

					<div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
						<Image
							src={imageUrls[0]}
							alt="campaign cover image"
							className="aspect-[342/200] w-full min-w-[320px] rounded-lg object-cover lg:h-[400px] lg:max-w-[717px] lg:rounded-[10px]"
							width={342}
							height={200}
							onLoad={handleRevokeUrl(imageUrls[0])}
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
									onClick={handleShareLink}
								>
									Share this campaign
								</Button>
							</div>

							<div className="flex items-start gap-2 text-xs lg:text-base">
								<MoneyIcon className="mt-1 shrink-0 lg:mt-2 lg:size-6" />

								<p>
									Be the first to donate to this fundraiser, every penny donated will go a
									long way
								</p>
							</div>

							<div className="flex items-center gap-2 text-xs lg:text-base">
								<DummyAvatar className={"shrink-0 lg:size-8"} />

								<p>{fundraiserTarget} is in charge of this fundraiser.</p>
							</div>
						</article>
					</div>
				</section>

				<section className="mt-2 flex flex-col gap-6 lg:mt-6 lg:max-w-[717px]">
					<article>
						<Heading as="h3" className="flex gap-4 border-b border-b-placeholder p-2">
							Category:
							<span className="font-normal">{campaignCategory}</span>
						</Heading>

						<Heading as="h3" className="mt-3 border-b border-b-placeholder p-2 lg:mt-6">
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

						<ul className="grid grid-cols-2 justify-items-center gap-x-0 gap-y-6 lg:grid-cols-3">
							<TagList
								each={stepOneData.tags}
								render={(tag, index) => (
									<li key={`${tag}-${index}`} className="font-medium lg:text-xl">
										#{tag}
									</li>
								)}
							/>
						</ul>
					</article>
				</section>

				<section className="mt-8 flex items-start gap-4 lg:mt-12 lg:max-w-[717px]">
					<DummyAvatar className="size-12 lg:size-[8.2rem]" />

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

			<footer className="lpx-6 mt-auto flex w-full justify-end gap-2 border-t border-t-abeg-primary px-6 py-4 lg:gap-4 lg:px-[100px] lg:py-6">
				<FormActionButton
					type="button"
					variant="secondary"
					className="border-abeg-primary font-bold text-abeg-primary"
				>
					<Link href={"/create-campaign"}>Edit campaign</Link>
				</FormActionButton>

				<CustomDialog
					classNames={{
						content: "gap-0 max-lg:max-w-[331px] p-6",
					}}
					trigger={
						<FormActionButton type="button" className="bg-abeg-primary font-bold">
							Create Campaign
						</FormActionButton>
					}
				>
					<Success
						description="You have successfully created a campaign!"
						classNames={{
							wrapper: "p-0",
							heading: "text-sm font-bold lg:text-base",
							description: "text-xs lg:text-base",
							lottiePlayer: "max-lg:size-[100px]",
						}}
					/>

					<Button
						variant="primary"
						className="mt-6 text-sm font-bold lg:text-base"
						fullWidth
						onClick={handleShareLink}
					>
						Share Campaign
					</Button>

					<Button
						variant="secondary"
						className="mt-2 font-bold md:text-sm lg:text-base"
						fullWidth
					>
						<Link href={"/dashboard"}>Skip</Link>
					</Button>
				</CustomDialog>
			</footer>
		</div>
	);
}

export default Preview;
