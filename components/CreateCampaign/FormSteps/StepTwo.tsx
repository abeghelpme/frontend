import { DatePicker } from "@/components/ui/date-picker";
import { Select } from "@/components/ui/select";
import { callApi, zodValidator } from "@/lib";
import {
	STEP_DATA_KEY_LOOKUP,
	type StepTwoData,
	useFormStore,
} from "@/store/formStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import ErrorParagraph from "../ErrorParagraph";
import Heading from "../Heading";
import { useWatchFormStatus } from "./useWatchFormStatus";

function StepTwo() {
	const {
		currentStep,
		stepTwoData,
		actions: { setData, goToStep },
	} = useFormStore((state) => state);

	const { control, formState, register, handleSubmit } = useForm({
		mode: "onTouched",
		resolver: zodResolver(zodValidator("campaignStepTwo")!),
		defaultValues: stepTwoData,
	});

	useWatchFormStatus(formState);

	const onSubmit = async (data: StepTwoData) => {
		setData({ step: 2, data });

		const { data: dataInfo, error } = await callApi(
			`/campaign/create/two${localStorage.getItem("query-id")}`,
			data
		);

		if (dataInfo) {
			goToStep(currentStep + 1);
		}
	};

	return (
		<section>
			<Heading as="h2" className="text-formBtn">
				Share your funding goal and deadline
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[currentStep]}
				className="mt-3.2"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-2.4">
					<li>
						<label htmlFor="title" className="text-1.4 font-semibold lg:text-2">
							Campaign Title
						</label>

						<input
							{...register("title")}
							id="title"
							type="text"
							placeholder="Give your campaign a catchy title that can resonate with donors"
							className="w-full rounded-10 border border-unfocused px-0.8 py-1.6 text-1.2 focus-visible:outline-formBtn lg:py-2.2 lg:px-1.6 lg:text-1.6"
						/>

						<ErrorParagraph formState={formState} errorField="title" />
					</li>

					<li>
						<label className="text-1.4 font-semibold lg:text-2">
							Who is fundraising?
						</label>

						<Controller
							control={control}
							name="fundraiser"
							render={({ field }) => (
								<Select.Root
									defaultValue={field.value}
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-1.6 rounded-10 border-unfocused text-1.2 px-0.8 py-2.3 data-[placeholder]:text-placeholder lg:px-1.6 lg:py-3.4 lg:text-1.6"
									>
										<Select.Value placeholder="Specify who is fundraising" />
									</Select.Trigger>

									<Select.Content id="category">
										<Select.Item value="INDIVIDUAL">For Myself</Select.Item>
										<Select.Item value="BENEFICIARY">
											For Someone else
										</Select.Item>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<ErrorParagraph formState={formState} errorField="fundraiser" />
					</li>

					<li>
						<label htmlFor="goal" className="text-1.4 font-semibold lg:text-2">
							Campaign Goal
						</label>

						<input
							{...register("goal")}
							id="goal"
							type="number"
							placeholder="Set a realistic target amount"
							className="w-full rounded-10 border border-unfocused px-0.8 py-1.6 text-1.2 focus-visible:outline-formBtn lg:py-2.2 lg:px-1.6 lg:text-1.6"
						/>

						<ErrorParagraph formState={formState} errorField="goal" />
					</li>

					<li>
						<label className="text-1.4 font-semibold lg:text-2">
							Campaign Deadline
						</label>

						<Controller
							control={control}
							name="deadline"
							render={({ field }) => (
								<DatePicker
									className="mt-1.6 w-full justify-between rounded-10 border border-unfocused px-0.8 py-2.3 text-1.2 lg:py-3.4 lg:px-1.6 lg:text-1.6"
									placeholder="Specify the end date for your campaign"
									dateValueString={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<ErrorParagraph formState={formState} errorField="deadline" />
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepTwo;
