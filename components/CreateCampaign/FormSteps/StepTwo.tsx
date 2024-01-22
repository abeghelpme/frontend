import { DatePicker } from "@/components/primitives/Form/DatePicker";
import { Select } from "@/components/primitives/Form/Select";
import { useFormStore, type StepTwoData } from "@/store/formStore";
import { FORM_STEP_KEY_LOOKUP } from "@/store/formStore/formStore";
import { ChevronDownIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { DATE_TODAY } from "../campaign.constants";

function StepTwo() {
  const { setData, goToStep, stepTwoData } = useFormStore((state) => state);

  const { control, register, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: stepTwoData ?? {},
  });

  const onSubmit = (data: StepTwoData) => {
    setData({ step: 2, data });
    goToStep(3);
  };

  return (
    <section>
      <h2 className="text-[1.6rem] font-bold text-formBtn">
        Share your funding goal and deadline
      </h2>

      <form
        id={FORM_STEP_KEY_LOOKUP[2]}
        className="mt-[3.2rem]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
      >
        <ol className="flex flex-col gap-[2.4rem]">
          <li>
            <label
              htmlFor="campaignTitle"
              className="text-[1.4rem] font-semibold"
            >
              Campaign Title
            </label>

            <input
              {...register("campaignTitle")}
              id="campaignTitle"
              type="text"
              placeholder="Give your campaign a catchy title that can resonate with donors"
              className="mt-[1.6rem] w-full rounded-[10px] border-[1px] border-unfocused p-[1.5rem_0.8rem] text-[1rem] focus-visible:outline-formBtn"
            />
          </li>

          <li>
            <label className="text-[1.4rem] font-semibold">
              Who is fundraising?
            </label>

            <Controller
              control={control}
              name="fundraiserTarget"
              defaultValue=""
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Select.Trigger
                    icon={<ChevronDownIcon />}
                    className="mt-[1.6rem] rounded-[10px] border-unfocused p-[2.3rem_0.8rem] text-[1rem] data-[placeholder]:text-placeholder"
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
              className="text-[1.4rem] font-semibold"
            >
              Campaign Goal
            </label>

            <input
              {...register("campaignGoal")}
              id="campaignGoal"
              type="text"
              placeholder="Set a realistic target amount"
              className="mt-[1.6rem] w-full rounded-[10px] border-[1px] border-unfocused p-[1.5rem_0.8rem] text-[1rem] focus-visible:outline-formBtn"
            />
          </li>

          <li>
            <label className="text-[1.4rem] font-semibold">
              Campaign Deadline
            </label>

            <Controller
              control={control}
              defaultValue={DATE_TODAY}
              name="campaignDeadline"
              render={({ field }) => (
                <DatePicker
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
