import {
	CampaignOutlook,
	FormActionButton,
	Heading,
} from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import { useFormStore, useInitFormStore } from "@/store/formStore";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

void useInitFormStore.getState().actions.initializeFormData();

function PreviewCampaignPage() {
	const { campaignInfo } = useFormStore((state) => state);

	const router = useRouter();

	useEffect(() => {
		if (!campaignInfo.status || campaignInfo.status === "Draft") {
			toast.error("Error", {
				description: "Please complete the campaign before previewing",
				id: "incomplete",
				duration: 2000,
			});

			void router.push("/create-campaign");
		}
	}, [campaignInfo.status, router]);

	if (!campaignInfo.status || campaignInfo.status === "Draft") return null;

	const handlePublish = async () => {
		const { error } = await callApi<Campaign>("/campaign/publish", {
			campaignId: campaignInfo._id,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success("Campaign published successfully");
		void router.push(`/${campaignInfo.shortId}`);
	};

	// Take the first 200 characters of the campaign story
	const first200Chars = campaignInfo.story.substring(0, 200);

	// Find the last punctuation mark within the first 200 characters
	const lastPunctuationIndex = Math.max(
		first200Chars.lastIndexOf("."),
		first200Chars.lastIndexOf("!"),
		first200Chars.lastIndexOf("?")
	);

	// If a punctuation mark is found, use the substring from the start of the story to the last punctuation mark as the excerpt
	// If no punctuation mark is found, use the first 200 characters as the excerpt
	const excerpt =
		lastPunctuationIndex !== -1
			? first200Chars.substring(0, lastPunctuationIndex + 1)
			: first200Chars;

	return (
		<>
			<NextSeo
				title={campaignInfo.title}
				description={excerpt}
				canonical={campaignInfo.url}
				openGraph={{
					url: campaignInfo.url,
					title: campaignInfo.title,
					description: excerpt,
					...(campaignInfo.images.length > 0 && {
						images: campaignInfo.images.map((image) => {
							return { url: image?.secureUrl };
						}),
					}),
				}}
			/>
			<div className="mt-8 flex flex-col items-center gap-2 lg:mt-12 lg:gap-7">
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

					<div className="flex gap-5">
						<FormActionButton
							type="button"
							className="w-[20vw] bg-abeg-primary font-bold"
							onClick={() => void handlePublish()}
						>
							Publish Campaign
						</FormActionButton>

						<FormActionButton
							variant="secondary"
							type="button"
							className="w-[20vw] border-abeg-primary font-bold text-abeg-primary"
							onClick={() => void router.push("/create-campaign")}
						>
							Edit Campaign
						</FormActionButton>
					</div>

					<Heading as="h2" className="mt-8 text-xl lg:text-[32px]">
						{`${campaignInfo.title[0].toUpperCase()}${campaignInfo.title.slice(
							1
						)}`}
					</Heading>
				</header>

				<CampaignOutlook campaign={campaignInfo} />
			</div>
		</>
	);
}

export default PreviewCampaignPage;
PreviewCampaignPage.protect = true;
