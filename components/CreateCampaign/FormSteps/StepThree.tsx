import { callApi, zodValidator } from "@/lib";
import { useWatchFormStatus } from "@/lib/hooks";
import {
	STEP_DATA_KEY_LOOKUP,
	type StepThreeData,
	useFormStore,
} from "@/store/formStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import DropZoneInput from "../DropZoneInput";
import ErrorParagraph from "../ErrorParagraph";
import Heading from "../Heading";
import ImagePreview from "../ImagePreview";
import TiptapEditor from "../TipTapEditor";

function StepThree() {
	const {
		campaignId,
		stepThreeData,
		actions: { setData },
	} = useFormStore((state) => state);

	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState,
		setValue: setFormValue,
	} = useForm({
		mode: "onTouched",
		resolver: zodResolver(zodValidator("campaignStepThree")!),
		defaultValues: stepThreeData,
	});

	useWatchFormStatus(formState);

	const onFormSubmit = async (data: StepThreeData) => {
		setData({ step: 3, data });

		const formData = new FormData();

		formData.set("story", data.story);
		formData.set("storyHtml", data.storyHtml);

		data.photos.forEach((imageFile) => {
			formData.append("photos", imageFile);
		});

		formData.set("campaignId", campaignId);

		const { data: dataInfo, error } = await callApi(
			`/campaign/create/three`,
			formData
		);

		if (dataInfo) {
			void router.push("/create-campaign/preview");
		}
	};

	return (
		<section className="w-full">
			<Heading as="h2" className="text-formBtn">
				Your story matters and this is where it begins.
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[3]}
				className="mt-@3.2 lg:mt-@4.8"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onFormSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-@2.4">
					<li>
						<label className="text-sm font-semibold lg:text-xl">
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

									<ErrorParagraph formState={formState} errorField="photos" />

									<ImagePreview value={field.value} onChange={field.onChange} />
								</>
							)}
						/>
					</li>

					<li>
						<label className="text-sm font-semibold lg:text-xl">
							Campaign Story
						</label>

						<p className="my-@1.6 text-xs lg:text-base">
							A detailed description of the campaign, outlining the need for
							funding and how the funds will be used.
						</p>

						<Controller
							control={control}
							name="storyHtml"
							render={({ field }) => (
								<TiptapEditor
									placeholder="Write a compelling story that would arouse the interest of donors..."
									setFormValue={setFormValue}
									editorContent={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<ErrorParagraph formState={formState} errorField="story" />
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepThree;
