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
import FormErrorMessage from "../FormErrorMessage";
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
			<Heading as="h1" className="text-abeg-primary">
				Create a campaign to fund your passion or cause.
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[currentStep]}
				className="mt-8"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onFormSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-6">
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
										className="mt-4 h-[50px] rounded-[10px] border-unfocused px-2 text-xs data-[placeholder]:text-placeholder lg:h-[58px]  lg:px-4 lg:text-base"
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

						<FormErrorMessage formState={formState} errorField={"categoryId"} />
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
										className="mt-4 h-[50px] rounded-[10px] border-unfocused px-2 text-xs data-[placeholder]:text-placeholder lg:h-[58px] lg:px-4 lg:text-base"
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

						<FormErrorMessage formState={formState} errorField={"country"} />
					</li>

					<li>
						<label htmlFor="tags" className="text-sm font-semibold lg:text-xl">
							Campaign Tags
						</label>

						<div className="mt-4 flex items-center gap-2">
							<input
								ref={tagInputRef}
								name="tags"
								type="text"
								placeholder="Add hashtags or search keywords to your campaign"
								className="focus-visible:outlineabeg-primary w-full rounded-[10px] border border-unfocused px-2 py-4 text-xs lg:p-4 lg:text-base"
								onKeyDown={handleAddTags}
							/>

							<Button
								type="button"
								variant="secondary"
								className="rounded-md border-abeg-primary px-3 py-2 text-xs font-semibold text-abeg-primary lg:px-[15px] lg:py-4 lg:text-base"
								onClick={handleAddTags}
							>
								Add
							</Button>
						</div>

						<div className="mt-4 flex flex-col gap-4">
							<span className="text-xs text-abeg-primary">
								{stepOneData.tags.length}/5 tags
							</span>

							<ul className="flex flex-wrap gap-2 text-xs font-medium text-abeg-primary">
								<TagList
									each={stepOneData.tags}
									render={(tag) => (
										<li
											key={tag}
											className="flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] border-abeg-primary bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
										>
											<p>#{tag}</p>

											<button
												className="transition-transform duration-100 active:scale-[1.12]"
												type="button"
												onClick={handleRemoveTags(tag)}
											>
												<CrossIcon className="size-2.5" />
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
