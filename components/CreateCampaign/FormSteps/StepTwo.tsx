import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { type StepTwoData, useFormStore } from "@/store/useformStore";
import { STEP_DATA_KEY_LOOKUP } from "@/store/useformStore/constants";
import { ChevronDownIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import Heading from "../Heading";

function StepTwo() {
	const { setData, goToStep, stepTwoData } = useFormStore((state) => state);

	const { control, register, handleSubmit } = useForm({
		mode: "onTouched",
		defaultValues: stepTwoData,
	});

	const onSubmit = (data: StepTwoData) => {
		setData({ step: 2, data });
		goToStep(3);
	};

	return (
		<section>
			<Heading as="h2" className="text-formBtn">
				Share your funding goal and deadline
			</Heading>

			<form
				id={STEP_DATA_KEY_LOOKUP[2]}
				className="mt-3.2"
				onSubmit={(event) => {
					event.preventDefault();
					void handleSubmit(onSubmit)(event);
				}}
			>
				<ol className="flex flex-col gap-2.4">
					<li>
						<label
							htmlFor="campaignTitle"
							className="text-1.4 font-semibold lg:text-2"
						>
							Campaign Title
						</label>

						<input
							{...register("campaignTitle")}
							id="campaignTitle"
							type="text"
							placeholder="Give your campaign a catchy title that can resonate with donors"
							className="w-full rounded-10 border border-unfocused px-0.8 py-1.6 text-1 focus-visible:outline-formBtn lg:py-2.2 lg:px-1.6 lg:text-1.6"
						/>
					</li>

					<li>
						<label className="text-1.4 font-semibold lg:text-2">
							Who is fundraising?
						</label>

						<Controller
							control={control}
							name="fundraiserTarget"
							render={({ field }) => (
								<Select.Root
									name={field.name}
									value={field.value}
									onValueChange={field.onChange}
								>
									<Select.Trigger
										icon={<ChevronDownIcon />}
										className="mt-1.6 rounded-10 bg-white border-unfocused text-1 px-0.8 py-2.3 data-[placeholder]:text-placeholder lg:px-1.6 lg:py-3.4 lg:text-1.6"
									>
										<Select.Value placeholder="Specify who is fundraising" />
									</Select.Trigger>

									<Select.Content id="category">
										<Select.Item value="Individual">For Myself</Select.Item>
										<Select.Item value="Beneficiary">
											For someone else
										</Select.Item>
									</Select.Content>
								</Select.Root>
							)}
						/>
					</li>

					<li>
						<label
							htmlFor="campaignGoal"
							className="text-1.4 font-semibold lg:text-2"
						>
							Campaign Goal
						</label>

						<input
							{...register("campaignGoal")}
							id="campaignGoal"
							type="text"
							placeholder="Set a realistic target amount"
							className="w-full rounded-10 border border-unfocused px-0.8 py-1.6 text-1 focus-visible:outline-formBtn lg:py-2.2 lg:px-1.6 lg:text-1.6"
						/>
					</li>

					<li>
						<label className="text-1.4 font-semibold lg:text-2">
							Campaign Deadline
						</label>

						<Controller
							control={control}
							name="campaignDeadline"
							render={({ field }) => (
								<DatePicker
									className="mt-1.6 w-full justify-between rounded-10 border border-unfocused px-0.8 py-2.3 text-left text-1.2 font-normal lg:py-3.4 lg:px-1.6 lg:text-1.6"
									placeholder="Specify the end date for your campaign"
									dateValue={field.value}
									onChange={field.onChange}
								/>
							)}
						/>
					</li>
				</ol>
			</form>
		</section>
	);
}

export default StepTwo;
