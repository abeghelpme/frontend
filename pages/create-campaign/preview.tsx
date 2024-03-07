import { FormActionButton, Heading } from "@/components/create-campaign";
import PreviewComponent from "@/components/create-campaign/PreviewComponent";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib/helpers/campaign";
import { useSession } from "@/store";
import { useFormStore } from "@/store/formStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

function Preview() {
	const { user } = useSession((state) => state);

	const {
		campaignInfo,
		actions: { initializeFormData },
	} = useFormStore((state) => state);
	const router = useRouter();

	useEffect(() => {
		if (campaignInfo.status === "Draft") {
			toast.error("Campaign is incomplete");
			void router.push("/create-campaign");
		}
		if (user) {
			initializeFormData(user._id);
		}
	}, [campaignInfo.status, router, user]);

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

	return (
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

				<Heading as="h2" className="mt-8 text-xl lg:text-[32px]">
					{`${campaignInfo.title[0].toUpperCase()}${campaignInfo.title.slice(
						1
					)}`}
				</Heading>
			</header>

			<PreviewComponent campaign={campaignInfo} />
		</div>
	);
}

export default Preview;
Preview.protect = true;
