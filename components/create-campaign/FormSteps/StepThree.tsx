import type { Campaign } from "@/interfaces/Campaign";
import { zodValidator } from "@/lib";
import { callApi } from "@/lib/helpers/campaign";
import { useWatchFormStatus } from "@/lib/hooks";
<<<<<<< HEAD
import { type StepThreeData, initialFormState, useFormStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
=======
import { STEP_DATA_KEY_LOOKUP } from "@/store/formStore";
import { useCampaignForm } from "@/store/useCampaignForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, type UseFormSetValue, useForm } from "react-hook-form";
>>>>>>> 25e901c (refactor)
import { toast } from "sonner";
import DropZoneInput from "../DropZoneInput";
import FormErrorMessage from "../FormErrorMessage";
import Heading from "../Heading";
import ImagePreview from "../ImagePreview";
import { TipTapEditor } from "../TipTapEditor";

function StepThree() {
	const router = useRouter();

	const {
<<<<<<< HEAD
		currentStep,
		currentCampaign,
		formStepData,
		actions: { updateFormData, updateCurrentCampaign },
	} = useFormStore((state) => state);
=======
		values,
		localImages,
		fileBlobs,
		actions: { updateValues, updateInitialValues },
	} = useCampaignForm((state) => state);

	const currentStep = values.currentStep ?? 3;
>>>>>>> 25e901c (refactor)

	const {
		control,
		handleSubmit,
		formState,
		getValues,
		reset,
		setValue: setFormValue,
	} = useForm({
		mode: "onChange",
		resolver: zodResolver(zodValidator("campaignStepThree")!),
<<<<<<< HEAD
		defaultValues: formStepData,
=======
		defaultValues: { ...values, blobs: fileBlobs },
>>>>>>> 25e901c (refactor)
	});

	useEffect(() => {
		if (!getValues().categoryId) {
			reset(formStepData);
		}
	}, [formStepData]);

	useWatchFormStatus(formState);

<<<<<<< HEAD
	const onSubmit = async (data: StepThreeData) => {
		updateFormData(data);

		const formData = new FormData();

		formData.set("story", data.story);
		formData.set("storyHtml", data.storyHtml);
		formData.set("campaignId", currentCampaign._id);
		data.photos.forEach((imageFile) => formData.append("photos", imageFile));
=======
	const onSubmit = async (data: Partial<Campaign>) => {
		const formData = new FormData();

		formData.set("story", data.story ?? "");
		formData.set("storyHtml", data.storyHtml ?? "");
		formData.set("campaignId", values._id ?? "");
		data.photos &&
			data.photos.forEach((image) => {
				const blob = new Blob([JSON.stringify(image)], {
					type: "application/json",
				});
				formData.append("photos", blob);
			});
>>>>>>> 25e901c (refactor)

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

<<<<<<< HEAD
		updateCurrentCampaign(dataInfo.data);
		updateFormData(initialFormState.formStepData);
		void router.push("/dashboard");
=======
		updateInitialValues(dataInfo.data);
		void router.push("/create-campaign/preview");
>>>>>>> 25e901c (refactor)
	};

	return (
		<section className="w-full">
			<Heading as="h1" className="text-abeg-primary">
				Your story matters and this is where it begins.
			</Heading>

			<form
				id={`${currentStep}`}
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
							name="blobs"
							render={({ field }) => (
								<>
									<DropZoneInput
										value={field.value}
										onChange={field.onChange}
									/>

									<FormErrorMessage formState={formState} errorField="photos" />

									<ImagePreview value={localImages} onChange={field.onChange} />
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
<<<<<<< HEAD
									editorContent={field.value}
									setFormValue={setFormValue}
=======
									setFormValue={
										setFormValue as UseFormSetValue<{
											blobs?: File[];
											story: string;
										}>
									}
									editorContent={field.value || ""}
>>>>>>> 25e901c (refactor)
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
