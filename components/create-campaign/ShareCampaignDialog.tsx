import type { Campaign } from "@/interfaces/Campaign";
import { useShareCampaign } from "@/lib/hooks";
import { FilesIcon, Link, LinkIcon } from "lucide-react";
import Image from "next/image";
import { CustomDialog } from "../common";
import { whatsappIcon, xIcon } from "../common/campaign-icons";

type ShareCampaignProps = {
	campaign: Campaign;
	trigger: React.ReactNode;
};

function ShareCampaignDialog({ campaign, trigger }: ShareCampaignProps) {
	const { handleShareLink, generateTweet, generateWhatsAppMessage } =
		useShareCampaign();

	return (
		<CustomDialog
			classNames={{ content: "gap-0 px-4 py-14 md:p-12 w-full max-w-[500px]" }}
			trigger={trigger}
		>
			<p className="text-center">
				Spread the word, share your campaign with friends, family, and the
				world, make a difference
			</p>
			<div className="mt-6 flex items-center justify-between rounded-lg bg-abeg-primary p-2 text-base text-white">
				<LinkIcon className="size-5 " />
				<p className="mx-1 max-w-[80%] overflow-hidden overflow-ellipsis whitespace-nowrap">
					{campaign.url}
				</p>
				<button
					className="flex shrink-0 rounded-lg bg-white px-1 py-[5px] text-xs text-abeg-primary"
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
					href={generateTweet(campaign.title, campaign.url, campaign.tags)}
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
					<Image src={whatsappIcon as string} width={32} height={32} alt="" />
					Whatsapp
				</Link>
			</div>
		</CustomDialog>
	);
}
export default ShareCampaignDialog;
