import type { Campaign } from "@/interfaces/Campaign";
import { zodValidator } from "@/lib";
import { callApi } from "@/lib/helpers/campaign";
import { useWatchFormStatus } from "@/lib/hooks";
import {
	STEP_DATA_KEY_LOOKUP,
	type StepThreeData,
	useFormStore,
} from "@/store/formStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import DropZoneInput from "../DropZoneInput";
import FormErrorMessage from "../FormErrorMessage";
import Heading from "../Heading";
import ImagePreview from "../ImagePreview";
import { TipTapEditor } from "../TipTapEditor";

function StepThree() {
	const router = useRouter();

	const {
		campaignInfo,
		stepThreeData,
		actions: { setData, setCampaignInfo },
	} = useFormStore((state) => state);

	const {
		control,
		handleSubmit,
		formState,
		setValue: setFormValue,
	} = useForm({
		mode: "onChange",
		resolver: zodResolver(zodValidator("campaignStepThree")!),
		defaultValues: stepThreeData,
	});

	useWatchFormStatus(formState);

	const onSubmit = async (data: StepThreeData) => {
		setData({ step: 3, data });

		const formData = new FormData();

		formData.set("story", data.story);
		formData.set("storyHtml", data.storyHtml);
		formData.set("campaignId", campaignInfo._id);
		data.photos.forEach((imageFile) => formData.append("photos", imageFile));

		const { data: dataInfo, error } = await callApi<Partial<Campaign>>(
			`/campaign/create/three`,
			formData
		);

		if (error) {
			toast.error(error.status, {
				description: error.message,
			});

			return;
		}

		if (!dataInfo.data) return;

		setCampaignInfo(dataInfo.data);
		void router.push("/create-campaign/preview");
	};

	return (
		<section className="w-full">
			<Heading as="h1" className="text-abeg-primary">
				Your story matters and this is where it begins.
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[3]}
				className="mt-8 lg:mt-12"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-6">
					<li>
						<label
							htmlFor="photos"
							className="text-sm font-semibold lg:text-xl"
						>
							Campaign Cover Image
						</label>

						<Controller
							control={control}
							name="photos"
							render={({ field }) => (
								<>
									<DropZoneInput
										value={field.value}
										onChange={field.onChange}
									/>

									<FormErrorMessage formState={formState} errorField="photos" />

									<ImagePreview value={field.value} onChange={field.onChange} />
								</>
							)}
						/>
					</li>

					<li>
						<label htmlFor="story" className="text-sm font-semibold lg:text-xl">
							Campaign Story
						</label>

						<p className="my-4 text-xs lg:text-base">
							A detailed description of the campaign, outlining the need for
							funding and how the funds will be used.
						</p>

						<Controller
							control={control}
							name="storyHtml"
							render={({ field }) => (
								<TipTapEditor
									placeholder="Write a compelling story that would arouse the interest of donors..."
									setFormValue={setFormValue}
									editorContent={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<FormErrorMessage formState={formState} errorField="story" />
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepThree;
