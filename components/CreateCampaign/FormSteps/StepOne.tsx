import { Button, Select } from "@/components/ui";
import { callApi, zodValidator } from "@/lib";
import { useElementList } from "@/lib/hooks";
import { CrossIcon } from "@/public/assets/icons/campaign";
import {
	STEP_DATA_KEY_LOOKUP,
	type StepOneData,
	useFormStore,
} from "@/store/formStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { type KeyboardEvent, type MouseEvent, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ErrorParagraph from "../ErrorParagraph";
import Heading from "../Heading";
import { validateTagValue } from "../campaign-utils";
import { targetCountries } from "../campaign-utils/constants";
import { useWatchFormStatus } from "./useWatchFormStatus";

function StepOne() {
	const tagInputRef = useRef<HTMLInputElement>(null);

	const {
		campaignId,
		currentStep,
		fundraiserCategories,
		stepOneData,
		actions: { goToStep, setData, setCampaignId },
	} = useFormStore((state) => state);

	const { For: TagList } = useElementList();
	const { For: CategoryList } = useElementList();
	const { For: CountryList } = useElementList();

	const {
		control,
		formState,
		handleSubmit,
		setValue: setFormValue,
	} = useForm({
		mode: "onTouched",
		resolver: zodResolver(zodValidator("campaignStepOne")!),
		defaultValues: stepOneData,
	});

	useWatchFormStatus(formState);

	const onFormSubmit = async (data: StepOneData) => {
		setData({ step: 1, data });

		const { data: dataInfo, error } = await callApi<{
			data: { _id: string };
		}>("/campaign/create/one", data);

		if (dataInfo) {
			setCampaignId(dataInfo.data._id);
			goToStep(currentStep + 1);
		}
	};

	const handleAddTags = (
		event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>
	) => {
		const isEnterKey = (event as KeyboardEvent).key === "Enter";

		if (event.type === "keydown" && !isEnterKey) return;

		if (event.type === "keydown") {
			event.preventDefault();
		}

		const validTag = validateTagValue(
			stepOneData.tags,
			tagInputRef.current?.value
		);

		if (!validTag) return;

		const newTagState = [...stepOneData.tags, validTag];

		setData({ step: 1, data: { tags: newTagState } });

		setFormValue("tags", newTagState);

		tagInputRef.current && (tagInputRef.current.value = "");
	};

	const handleRemoveTags = (tag: string) => () => {
		const newTagState = stepOneData.tags.filter((t) => t !== tag);

		setData({ step: 1, data: { tags: newTagState } });

		setFormValue("tags", newTagState);
	};

	return (
		<section className="w-full">
			<Heading as="h2" className="text-formBtn">
				Create a campaign to fund your passion or cause.
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[currentStep]}
				className="mt-3.2"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onFormSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-2.4">
					<li>
						<label className="text-1.4 font-semibold lg:text-2">
							What best describes your fundraiser?
						</label>

						<Controller
							control={control}
							name="categoryId"
							render={({ field }) => (
								<Select.Root
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-1.6 rounded-10 border-unfocused px-0.8 py-2.3 text-1 data-[placeholder]:text-placeholder lg:px-1.6 lg:py-3.4 lg:text-1.6"
									>
										<Select.Value placeholder="Select what category best suit your fundraiser" />
									</Select.Trigger>

									<Select.Content>
										<CategoryList
											each={fundraiserCategories}
											render={(category) => (
												<Select.Item key={category.id} value={category.id}>
													{category.name}
												</Select.Item>
											)}
										/>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<ErrorParagraph formState={formState} errorField={"categoryId"} />
					</li>

					<li>
						<label className="text-1.4 font-semibold lg:text-2">
							What country are you located?
						</label>

						<Controller
							control={control}
							name="country"
							render={({ field }) => (
								<Select.Root
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-1.6 rounded-10 border-unfocused text-1 px-0.8 py-2.3 data-[placeholder]:text-placeholder lg:px-1.6 lg:py-3.4 lg:text-1.6"
									>
										<Select.Value placeholder="Select your country" />
									</Select.Trigger>

									<Select.Content>
										<CountryList
											each={targetCountries}
											render={(country) => (
												<Select.Item
													key={country}
													value={country.toUpperCase()}
												>
													{country}
												</Select.Item>
											)}
										/>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<ErrorParagraph formState={formState} errorField={"country"} />
					</li>

					<li>
						<label htmlFor="tags" className="text-1.4 font-semibold lg:text-2">
							Campaign Tags
						</label>

						<div className="mt-1.6 flex items-center gap-0.8">
							<input
								ref={tagInputRef}
								name="tags"
								type="text"
								placeholder="Add hashtags or search keywords to your campaign"
								className="w-full rounded-10 border border-unfocused px-0.8 py-1.6 text-1 focus-visible:outline-formBtn lg:py-2.2 lg:px-1.6 lg:text-1.6"
								onKeyDown={handleAddTags}
							/>

							<Button
								type="button"
								variant="secondary"
								className="rounded-6 border-formBtn px-1.2 py-0.8 text-1.2 font-semibold text-formBtn lg:px-2.8 lg:py-1.2 lg:text-1.6"
								onClick={handleAddTags}
							>
								Add
							</Button>
						</div>

						<div className="mt-1.6 flex flex-col gap-1.6">
							<span className="text-1.2 text-formBtn">
								{stepOneData.tags.length}/5 tags
							</span>

							<ul className="flex flex-wrap gap-0.8 text-1.2 font-medium text-formBtn">
								<TagList
									each={stepOneData.tags}
									render={(tag) => (
										<li
											key={tag}
											className="flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] border-formBtn bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
										>
											<p>#{tag}</p>

											<button
												className="transition-transform duration-100 active:scale-[1.12]"
												type="button"
												onClick={handleRemoveTags(tag)}
											>
												<CrossIcon className="size-1" />
											</button>
										</li>
									)}
								/>
							</ul>
						</div>
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepOne;
