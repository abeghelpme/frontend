import {
	DummyAvatar,
	MoneyIcon,
	ShareIcon,
	whatsappIcon,
	xIcon,
} from "@/components/common/campaign-icons";
import type { ApiResponse } from "@/interfaces";
import type { Campaign } from "@/interfaces/Campaign";
import {
	type DonationDetailsType,
	callApi,
	cn,
	getDaysLeft,
	zodValidator,
} from "@/lib";
import { getDateFromString } from "@/lib/helpers/campaign";
import { useElementList, useShareCampaign } from "@/lib/hooks";
import { useSlot } from "@/lib/hooks/useSlot";
import { useSession } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { FilesIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	CustomDialog,
	FormErrorMessage,
	Heading,
	SingleCampaignProgress,
} from "../common";
import { FAQ, UrgentFundraisers } from "../common/landingPage";
import { Button, Checkbox, Input } from "../ui";
import CampaignCarousel from "./CampaignCarousel";
import DonorSection from "./DonorSection";

type CampaignOutlookProps = {
	children?: React.ReactNode;
	campaign: Campaign;
	featuredCampaigns: Campaign[];
	excerpt: string;
	campaignId: string;
};

type CampaignHeaderProps = {
	children: React.ReactNode;
	className?: string;
};

function CampaignOutlook(props: CampaignOutlookProps) {
	const { campaign, featuredCampaigns, excerpt, children, campaignId } = props;

	const [TagList] = useElementList();

	const HeaderSlot = useSlot(children, CampaignOutlook.Header);

	const { generateTweet, generateWhatsAppMessage, handleShareLink } =
		useShareCampaign();

	const fundraiserTarget =
		`${campaign.creator?.firstName} ${campaign.creator?.lastName}` ||
		"Beneficiary";

	const campaignDeadline = getDateFromString(campaign.deadline);

	//donation flow
	const { user } = useSession((state) => state);
	useEffect(() => {
		if (user) {
			reset({
				donorName: `${user.firstName} ${user.lastName}`,
				donorEmail: user.email,
				amount: "",
			});
		}
	}, [user]);
	const [hideMyDetails, setHideMyDetails] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DonationDetailsType>({
		resolver: zodResolver(zodValidator("donationDetails")!),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			donorName: "",
			donorEmail: "",
			amount: "",
		},
	});
	const onDonateSubmit: SubmitHandler<DonationDetailsType> = async (
		data: DonationDetailsType
	) => {
		console.log({ ...data, hideMyDetails, campaignId, amount: +data.amount });
		const { data: dataInfo, error } = await callApi<ApiResponse>(
			"/donation/create",
			{
				...data,
				hideMyDetails,
				campaignId,
				amount: +data.amount,
			}
		);
		if (error) {
			toast.error("Error", {
				description: error.message,
			});
			return;
		}
		toast.success("Success", {
			description: dataInfo?.message,
		});
	};

	return (
		<main className="flex flex-col pb-20 text-abeg-text">
			<section className="relative px-6 pb-14 pt-11 text-white md:px-[80px]">
				<Image
					src="/assets/images/shared/hero-background.svg"
					className="z-[-1] object-cover"
					priority={true}
					alt=""
					fill
				/>

				{HeaderSlot}

				<p className="mt-3 text-pretty text-base md:text-lg">{excerpt}</p>

				<div className="relative mt-6 flex flex-wrap items-center gap-2 max-lg:justify-between lg:gap-9">
					<figure className="flex items-center gap-3 ">
						{campaign?.creator?.photo && (
							<Image
								src={campaign.creator.photo}
								alt="image"
								width={200}
								height={200}
								className="size-10 rounded-full"
							/>
						)}
						{!campaign?.creator?.photo && <DummyAvatar className="size-10" />}

						<figcaption className="text-lg">{fundraiserTarget}</figcaption>
					</figure>
					<CustomDialog
						classNames={{
							content: "gap-0 p-12 md:p-12 w-full max-w-[500px]",
						}}
						trigger={
							<button className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-lg font-bold">
								Donate
							</button>
						}
					>
						<form
							className="flex flex-col gap-4"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit(onDonateSubmit)(e);
							}}
						>
							<p className="mt-2 text-center">
								Donate to this campaign. Every penny brings us one step closer
								to making a difference
							</p>
							<div className="space-y-1 bg-white">
								<label
									htmlFor="donorName"
									className="text-sm font-medium md:text-base"
								>
									Full name
								</label>
								<Input
									{...register("donorName")}
									autoFocus
									type="text"
									id="donorName"
									required
									placeholder="Enter your Full name"
									className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
										errors.donorName &&
										"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
									}`}
									disabled={user?.firstName && user.lastName ? true : false}
								/>
								<FormErrorMessage
									error={errors.donorName!}
									errorMsg={errors.donorName?.message!}
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="donorEmail"
									className="text-sm font-medium md:text-base"
								>
									Email address
								</label>
								<Input
									{...register("donorEmail")}
									autoFocus
									type="text"
									id="donorEmail"
									required
									placeholder="Enter your email address"
									className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
										errors.donorEmail &&
										"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
									}`}
									disabled={user?.email ? true : false}
								/>
								<FormErrorMessage
									error={errors.donorEmail!}
									errorMsg={errors.donorEmail?.message!}
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="amount"
									className="text-sm font-medium md:text-base"
								>
									Amount
								</label>
								<Input
									{...register("amount")}
									autoFocus
									type="number"
									id="amount"
									required
									placeholder="Enter any amount"
									className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
										errors.amount &&
										"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
									}`}
								/>
								<FormErrorMessage
									error={errors.amount!}
									errorMsg={errors.amount?.message!}
								/>
							</div>
							<div className="flex items-center gap-3">
								<Checkbox
									name="hideMyDetails"
									id="hideMydetails"
									className="accent-red-500"
									checked={hideMyDetails}
									onCheckedChange={() => setHideMyDetails(!hideMyDetails)}
								/>
								<label
									htmlFor="hideMyDetails"
									className="cursor-pointer text-sm font-medium md:text-base"
									onClick={() => setHideMyDetails(!hideMyDetails)}
								>
									Donate anonymously
								</label>
							</div>
							<Button className="bg-abeg-primary text-base text-white">
								Donate
							</Button>
						</form>
					</CustomDialog>

					<CustomDialog
						classNames={{
							content: "gap-0 p-12 md:p-12 w-full max-w-[500px]",
						}}
						trigger={
							<button className="absolute right-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03] max-lg:hidden">
								<ShareIcon />
							</button>
						}
					>
						<p className="text-center">
							Spread the word, share your campaign with friends, family, and the
							world. Every share brings us one step closer to making a
							difference
						</p>
						<div className="mt-6 flex items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
							<div className="flex items-center gap-1">
								<LinkIcon className="size-5" />
								<p className="[overflow-wrap:anywhere]">{campaign.url}</p>
							</div>
							<button
								className="flex shrink-0 gap-1 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
								onClick={handleShareLink(campaign.url)}
							>
								<FilesIcon className="size-4" />
								Copy link
							</button>
						</div>
						<div className="mt-6 flex w-full items-center justify-between gap-4 text-base">
							<hr className="my-1 w-full border border-placeholder" />
							<p className="shrink-0">or share on</p>
							<hr className="my-1 w-full border border-placeholder" />
						</div>
						<div className="mt-6 flex w-full items-center justify-between">
							<Link
								href={generateTweet(
									campaign.title,
									campaign.url,
									campaign.tags
								)}
								target="_blank"
								className="flex w-full items-center gap-2"
							>
								<Image src={xIcon as string} width={32} height={32} alt="" />
								Twitter (X)
							</Link>

							<Link
								href={generateWhatsAppMessage(campaign.title, campaign.url)}
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

				<CampaignCarousel
					images={campaign.images}
					classNames={{ base: "mt-8" }}
					captionContent={{
						location: campaign.country,
						donorCount: 0,
						daysLeft: getDaysLeft(campaign.deadline),
					}}
				/>

				<div className="relative mt-6">
					<TagList
						className="flex flex-wrap gap-5 max-lg:pr-[42px]"
						each={campaign.tags}
						render={(tag, index) => (
							<li
								key={`${tag}-${index}`}
								className="rounded-[20px] border border-white bg-white/30 px-[30px] py-1 text-base font-bold md:text-lg "
							>
								<p>{tag}</p>
							</li>
						)}
					/>

					<CustomDialog
						classNames={{
							content: "gap-0 p-12 md:p-12 w-full max-w-[500px]",
						}}
						trigger={
							<button className="absolute right-0 top-0 rounded-full border border-white bg-abeg-text/40 p-2 active:scale-[1.03] lg:hidden">
								<ShareIcon />
							</button>
						}
					>
						<p className="text-center">
							Spread the word, share your campaign with friends, family, and the
							world. Every share brings us one step closer to making a
							difference
						</p>
						<div className="mt-6 flex items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
							<div className="flex items-center gap-1">
								<LinkIcon className="size-5" />
								<p className="[overflow-wrap:anywhere]">{campaign.url}</p>
							</div>
							<button
								className="flex shrink-0 gap-1 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
								onClick={handleShareLink(campaign.url)}
							>
								<FilesIcon className="size-4" />
								Copy link
							</button>
						</div>
						<div className="mt-6 flex w-full items-center justify-between gap-4 text-base">
							<hr className="my-1 w-full border border-placeholder" />
							<p className="shrink-0">or share on</p>
							<hr className="my-1 w-full border border-placeholder" />
						</div>
						<div className="mt-6 flex w-full items-center justify-between">
							<Link
								href={generateTweet(
									campaign.title,
									campaign.url,
									campaign.tags
								)}
								target="_blank"
								className="flex w-full items-center gap-2"
							>
								<Image src={xIcon as string} width={32} height={32} alt="" />
								Twitter (X)
							</Link>

							<Link
								href={generateWhatsAppMessage(campaign.title, campaign.url)}
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
			</section>

			<div className="mt-14 flex flex-col self-center px-6 max-lg:max-w-[450px] max-lg:items-center lg:flex-row-reverse lg:gap-5 lg:px-[80px]">
				<section className="mt-2 space-y-5 self-start px-[18px] py-6 lg:sticky lg:top-0 lg:min-w-[383px] lg:max-w-[505px]">
					<SingleCampaignProgress
						amountRaised={campaign.amountRaised}
						goal={campaign.goal}
						style2
					/>

					<article className="space-y-4">
						<CustomDialog
							classNames={{
								content: "gap-0 p-12 md:p-12 w-full max-w-[500px]",
							}}
							trigger={
								<Button
									variant="primary"
									className="w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:rounded-lg"
								>
									Donate to this campaign
								</Button>
							}
						>
							<form
								className="flex flex-col gap-4"
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit(onDonateSubmit)(e);
								}}
							>
								<p className="mt-2 text-center">
									Donate to this campaign. Every penny brings us one step closer
									to making a difference
								</p>
								<div className="space-y-1 bg-white">
									<label
										htmlFor="donorName"
										className="text-sm font-medium md:text-base"
									>
										Full name
									</label>
									<Input
										{...register("donorName")}
										autoFocus
										type="text"
										id="donorName"
										required
										placeholder="Enter your Full name"
										className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
											errors.donorName &&
											"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
										}`}
										disabled={user?.firstName && user.lastName ? true : false}
									/>
									<FormErrorMessage
										error={errors.donorName!}
										errorMsg={errors.donorName?.message!}
									/>
								</div>
								<div className="space-y-1">
									<label
										htmlFor="donorEmail"
										className="text-sm font-medium md:text-base"
									>
										Email address
									</label>
									<Input
										{...register("donorEmail")}
										autoFocus
										type="text"
										id="donorEmail"
										required
										placeholder="Enter your email address"
										className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
											errors.donorEmail &&
											"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
										}`}
										disabled={user?.email ? true : false}
									/>
									<FormErrorMessage
										error={errors.donorEmail!}
										errorMsg={errors.donorEmail?.message!}
									/>
								</div>
								<div className="space-y-1">
									<label
										htmlFor="amount"
										className="text-sm font-medium md:text-base"
									>
										Amount
									</label>
									<Input
										{...register("amount")}
										autoFocus
										type="number"
										id="amount"
										required
										placeholder="Enter any amount"
										className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
											errors.amount &&
											"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
										}`}
									/>
									<FormErrorMessage
										error={errors.amount!}
										errorMsg={errors.amount?.message!}
									/>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox
										name="hideMyDetails"
										id="hideMydetails"
										className="accent-red-500"
										checked={hideMyDetails}
										onCheckedChange={() => setHideMyDetails(!hideMyDetails)}
									/>
									<label
										htmlFor="hideMyDetails"
										className="cursor-pointer text-sm font-medium md:text-base"
										onClick={() => setHideMyDetails(!hideMyDetails)}
									>
										Donate anonymously
									</label>
								</div>
								<Button className="bg-abeg-primary text-base text-white">
									Donate
								</Button>
							</form>
						</CustomDialog>

						<CustomDialog
							classNames={{
								content: "gap-0 p-12 md:p-12 w-full max-w-[500px]",
							}}
							trigger={
								<Button
									variant="secondary"
									className="w-full rounded-md border-abeg-primary py-3 text-base font-bold text-abeg-primary lg:rounded-lg"
								>
									Share this campaign
								</Button>
							}
						>
							<p className="text-center">
								Spread the word, share your campaign with friends, family, and
								the world. Every share brings us one step closer to making a
								difference
							</p>
							<div className="mt-6 flex items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
								<div className="flex items-center gap-1">
									<LinkIcon className="size-5" />
									<p className="[overflow-wrap:anywhere]">{campaign.url}</p>
								</div>
								<button
									className="flex shrink-0 gap-1 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
									onClick={handleShareLink(campaign.url)}
								>
									<FilesIcon className="size-4" />
									Copy link
								</button>
							</div>
							<div className="mt-6 flex w-full items-center justify-between gap-4 text-base">
								<hr className="my-1 w-full border border-placeholder" />
								<p className="shrink-0">or share on</p>
								<hr className="my-1 w-full border border-placeholder" />
							</div>
							<div className="mt-6 flex w-full items-center justify-between">
								<Link
									href={generateTweet(
										campaign.title,
										campaign.url,
										campaign.tags
									)}
									target="_blank"
									className="flex w-full items-center gap-2"
								>
									<Image src={xIcon as string} width={32} height={32} alt="" />
									Twitter (X)
								</Link>

								<Link
									href={generateWhatsAppMessage(campaign.title, campaign.url)}
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
					</article>

					<article className="space-y-7">
						<figure className="flex items-start gap-2.5 text-sm lg:text-base">
							<MoneyIcon className="mt-[5px] size-6 shrink-0" />
							<figcaption>
								Be among the first to donate to this fundraiser, every penny
								donated will go a long way
							</figcaption>
						</figure>

						<figure className="flex items-center gap-2 text-sm lg:text-base">
							<DummyAvatar className="size-8 shrink-0" />
							<figcaption>
								{fundraiserTarget} is in charge of this fundraiser.
							</figcaption>
						</figure>
					</article>

					<DonorSection className="px-[19px]" />
				</section>

				<section className="max-w-[714px] text-2xl">
					<article>
						<Heading
							as="h3"
							className="flex gap-4 border-b border-b-placeholder p-2 text-base md:text-lg"
						>
							Category:
							<span className="font-normal">{campaign.category?.name}</span>
						</Heading>
						<Heading
							as="h3"
							className="mt-3 border-b border-b-placeholder p-2 text-base md:text-lg lg:mt-6"
						>
							Story
						</Heading>
						<div
							className="mt-6 min-h-16 text-justify text-base md:text-lg"
							dangerouslySetInnerHTML={{
								__html: campaign.storyHtml,
							}}
						/>

						<p className="mt-6 text-base md:text-xl lg:mt-12">
							Campaign closes on: {format(campaignDeadline, "dd-MM-yyyy")}.
						</p>

						<TagList
							className="mt-4 grid grid-cols-2 font-medium lg:grid-cols-3 lg:gap-x-2 lg:gap-y-6"
							each={campaign.tags}
							render={(tag, index) => (
								<li
									key={`${tag}-${index}`}
									className="flex min-w-0 text-base md:text-lg"
								>
									<p className="truncate">{tag}</p>
								</li>
							)}
						/>
					</article>

					<article className="mt-12 flex items-start gap-6">
						<DummyAvatar className="size-[82px]" />

						<div>
							<p className="flex flex-col text-base md:text-lg">
								{fundraiserTarget} is in charge of this fundraiser.
								<span className="mt-4 text-base md:text-lg">
									{campaign.country}
								</span>
							</p>
							<Button
								variant="primary"
								className="mt-8 w-full rounded-md bg-abeg-primary py-3 text-base font-bold lg:mt-8 lg:py-4"
							>
								Reach out
							</Button>
						</div>
					</article>
				</section>
			</div>

			<UrgentFundraisers
				featuredCampaigns={featuredCampaigns}
				className="mt-[72px] lg:mt-[120px]"
			/>

			<FAQ className="mt-[72px] w-full px-6 lg:mt-[120px] lg:px-[80px]" />
		</main>
	);
}

function CampaignOutlookHeader(props: CampaignHeaderProps) {
	const { children, className } = props;

	return <header className={cn("w-full", className)}>{children}</header>;
}

CampaignOutlook.Header = CampaignOutlookHeader;
CampaignOutlookHeader.slot = "header";

export default CampaignOutlook;
