import { Button, Select } from "@/components/ui";
import { callApi, zodValidator } from "@/lib";
import { targetCountries, validateTagValue } from "@/lib/helpers/campaign";
import { useElementList, useWatchFormStatus } from "@/lib/hooks";
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
import { toast } from "sonner";
import ErrorParagraph from "../ErrorParagraph";
import Heading from "../Heading";

function StepOne() {
	const tagInputRef = useRef<HTMLInputElement>(null);

	const {
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

		if (error) {
			toast.error(error.status, {
				description: error.message,
			});

			return;
		}

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
			<Heading as="h2" className="text-abeg-primary">
				Create a campaign to fund your passion or cause.
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[currentStep]}
				className="mt-@3.2"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onFormSubmit)(event);
				}}
			>
				<ol className="gap-@2.4 flex flex-col">
					<li>
						<label
							htmlFor="categoryId"
							className="text-sm font-semibold lg:text-xl"
						>
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
										className="mt-@1.6 px-@0.8 py-@2.3 lg:px-@1.6 lg:py-@3.4 rounded-[10px] border-unfocused text-xs data-[placeholder]:text-placeholder lg:text-base"
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
						<label
							htmlFor="country"
							className="text-sm font-semibold lg:text-xl"
						>
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
										className="mt-@1.6 px-@0.8 py-@2.3 lg:px-@1.6 lg:py-@3.4 rounded-[10px] border-unfocused text-xs data-[placeholder]:text-placeholder lg:text-base"
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
						<label htmlFor="tags" className="text-sm font-semibold lg:text-xl">
							Campaign Tags
						</label>

						<div className="mt-@1.6 gap-@0.8 flex items-center">
							<input
								ref={tagInputRef}
								name="tags"
								type="text"
								placeholder="Add hashtags or search keywords to your campaign"
								className="px-@0.8 py-@1.6 focus-visible:outlineabeg-primary lg:px-@1.6 lg:py-@2.2 w-full rounded-[10px] border border-unfocused text-xs lg:text-base"
								onKeyDown={handleAddTags}
							/>

							<Button
								type="button"
								variant="secondary"
								className="borderabeg-primary px-@1.2 py-@0.8 lg:px-@2.8 lg:py-@1.2 rounded-md text-xs font-semibold text-abeg-primary lg:text-base"
								onClick={handleAddTags}
							>
								Add
							</Button>
						</div>

						<div className="mt-@1.6 gap-@1.6 flex flex-col">
							<span className="text-xs text-abeg-primary">
								{stepOneData.tags.length}/5 tags
							</span>

							<ul className="gap-@0.8 flex flex-wrap text-xs font-medium text-abeg-primary">
								<TagList
									each={stepOneData.tags}
									render={(tag) => (
										<li
											key={tag}
											className="borderabeg-primary flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
										>
											<p>#{tag}</p>

											<button
												className="transition-transform duration-100 active:scale-[1.12]"
												type="button"
												onClick={handleRemoveTags(tag)}
											>
												<CrossIcon className="size-@1" />
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
