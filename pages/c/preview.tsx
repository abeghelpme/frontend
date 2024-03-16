import {
	CampaignOutlook,
	FormActionButton,
	Heading,
} from "@/components/create-campaign";
import type { Campaign } from "@/interfaces/Campaign";
import { AuthenticatedUserLayout } from "@/layouts";
import { callApi } from "@/lib/helpers/campaign";
import { generateExcerpt } from "@/lib/helpers/campaign/generateExcerpt";
import { useFormStore } from "@/store";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

function PreviewCampaignPage() {
	const { currentCampaign } = useFormStore((state) => state);

	const router = useRouter();

	useEffect(() => {
		if (currentCampaign.status !== "Approved") {
			toast.error("Error", {
				description: "Please complete the campaign before previewing",
				id: "incomplete",
				duration: 2000,
			});

			void router.push("/dashboard");
		}
	}, [currentCampaign.status]);

	if (currentCampaign.status !== "Approved") return null;

	const handlePublish = async () => {
		const { error } = await callApi<Campaign>("/campaign/publish", {
			campaignId: currentCampaign._id,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success("Campaign published successfully");
		void router.push(`/${currentCampaign.shortId}`);
	};

	const excerpt = generateExcerpt(currentCampaign.story);

	return (
		<AuthenticatedUserLayout isDashboard>
			<NextSeo
				title={currentCampaign.title}
				description={excerpt}
				canonical={currentCampaign.url}
				openGraph={{
					url: currentCampaign.url,
					title: currentCampaign.title,
					description: excerpt,
					...(currentCampaign.images.length > 0 && {
						images: currentCampaign.images.map((image) => {
							return { url: image.secureUrl };
						}),
					}),
				}}
			/>

			<CampaignOutlook campaign={currentCampaign}>
				<CampaignOutlook.Header className="flex flex-col gap-2 text-abeg-primary lg:text-2xl">
					<Heading as="h1">Campaign Preview</Heading>

					<p>This is what your fundraiser campaign will look like to donors</p>

					<p className="font-semibold lg:text-xl">
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
							<Link
								href={{
									pathname: "/c/create",
									query: { id: currentCampaign._id },
								}}
							>
								Edit Campaign
							</Link>
						</FormActionButton>
					</div>

					<Heading
						as="h2"
						className="mt-8 text-xl text-abeg-text lg:text-[32px]"
					>
						{`${currentCampaign.title[0].toUpperCase()}${currentCampaign.title.slice(
							1
						)}`}
					</Heading>
				</CampaignOutlook.Header>
			</CampaignOutlook>
		</AuthenticatedUserLayout>
	);
}

export default PreviewCampaignPage;
PreviewCampaignPage.protect = true;
