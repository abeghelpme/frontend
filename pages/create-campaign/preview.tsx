import {
	CampaignOutlook,
	FormActionButton,
	Heading,
} from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import { generateExcerpt } from "@/lib/helpers/campaign/generateExcerpt";
import { useFormStore, useInitFormStore } from "@/store/formStore";
import { NextSeo } from "next-seo";
import Link from "next/link";
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

	const excerpt = generateExcerpt(campaignInfo.story);

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
							return { url: image.secureUrl };
						}),
					}),
				}}
			/>

			<CampaignOutlook campaign={campaignInfo}>
				<CampaignOutlook.Header className="flex flex-col gap-2 text-abeg-primary lg:text-2xl">
					<Heading as="h1">Campaign Preview</Heading>

					<p>This is what your fundraiser campaign will look like to donors</p>

					<p className="text-abeg-error-20 lg:text-xl">
						Note: Your campaign will become visible to donors once published and
						cannot be edited after!
					</p>

					<div className="flex gap-5">
						<FormActionButton
							type="button"
							className="bg-abeg-primary font-bold"
							onClick={() => void handlePublish()}
						>
							Publish Campaign
						</FormActionButton>

						<FormActionButton
							variant="secondary"
							type="button"
							className="border-abeg-primary font-bold"
						>
							<Link href={"/create-campaign"}> Edit Campaign</Link>
						</FormActionButton>
					</div>

					<Heading as="h2" className="mt-8 text-xl lg:text-[32px]">
						{`${campaignInfo.title[0].toUpperCase()}${campaignInfo.title.slice(
							1
						)}`}
					</Heading>
				</CampaignOutlook.Header>
			</CampaignOutlook>
		</>
	);
}

export default PreviewCampaignPage;
PreviewCampaignPage.protect = true;
