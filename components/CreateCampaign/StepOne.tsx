import { Select } from "@/components/primitives/Form/Select";
import crossIcon from "@/public/assets/icons/campaign/cross-icon.svg";
import { useFormStore, type StepOneData } from "@/store/formStore";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useRef, type KeyboardEvent, type MouseEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../primitives/Button/button";
import NextButton from "./NextButton";

function StepOne() {
  const campaignTagInputRef = useRef<HTMLInputElement>(null);

  const { setData, stepOneData } = useFormStore((state) => state);
  const campaignTags = stepOneData?.campaignTags ?? [];

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    getValues: getFormValues,
  } = useForm({
    mode: "onTouched",
    defaultValues: stepOneData ?? {},
  });

  const handleAddCampaignTag = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    //prettier-ignore
    const isEnterKey = (event as KeyboardEvent).key === "Enter"

    isEnterKey && event.preventDefault();

    if (event.type === "keydown" && !isEnterKey) return;

    if (!campaignTagInputRef.current) return;

    if (campaignTagInputRef.current.value.length < 3) return; //TODO - show error

    if (campaignTags.includes(campaignTagInputRef.current.value)) return; //TODO - show error

    if (campaignTags.length >= 5) return; //TODO - show error

    const newState = [...campaignTags, campaignTagInputRef.current.value];

    setData({
      step: 1,
      data: { ...(stepOneData ?? getFormValues()), campaignTags: newState },
    });

    setFormValue("campaignTags", newState);

    campaignTagInputRef.current.value = "";
  };

  const handleRemoveCampaignTags = (tag: string) => () => {
    const newState = campaignTags.filter((t) => t !== tag);

    if (stepOneData === null) return;

    setData({ step: 1, data: { ...stepOneData, campaignTags: newState } });

    setFormValue("campaignTags", newState);
  };

  const onSubmit = (data: StepOneData) => {
    setData({ step: 1, data, nextStep: 2 });
  };

  return (
    <section>
      <h2 className="px-[2.4rem] text-[1.6rem] font-bold text-formBtn">
        Create a campaign to fund your passion or cause.
      </h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
        className="mt-[3.2rem] flex flex-col gap-[4rem]"
      >
        <ol className="flex flex-col gap-[2.4rem] px-[2.4rem]">
          <li>
            <label className="text-[1.4rem] font-semibold">
              What best describes your fundraiser?
            </label>

            <Controller
              control={control}
              name="fundraiserCategory"
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <Select.Trigger
                    icon={<ChevronDownIcon />}
                    className="mt-[1.6rem] rounded-[10px] border-unfocused p-[2.1rem_0.8rem] text-[1rem] data-[placeholder]:text-placeholder"
                  >
                    <Select.Value placeholder="Select what category best suit your fundraiser" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="banana">Banana</Select.Item>
                    <Select.Item value="blueberry">Blueberry</Select.Item>
                    <Select.Item value="grapes">Grapes</Select.Item>
                    <Select.Item value="pineapple">Pineapple</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
          </li>

          <li>
            <label className="text-[1.4rem] font-semibold">
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
                    className="mt-[1.6rem] rounded-[10px] border-unfocused p-[2.3rem_0.8rem] text-[1rem] data-[placeholder]:text-placeholder"
                  >
                    <Select.Value placeholder="Select your country" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="Nigeria">Nigeria</Select.Item>
                    <Select.Item value="Ghana">Ghana</Select.Item>
                    <Select.Item value="Mali">Mali</Select.Item>
                    <Select.Item value="Liberia">Liberia</Select.Item>
                    <Select.Item value="Cameroon">Cameroon</Select.Item>
                    <Select.Item value="Gambia">Gambia</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
            />
          </li>

          <li>
            <label
              htmlFor="campaignTags"
              className="text-[1.4rem] font-semibold"
            >
              Campaign Tags
            </label>

            <div className="mt-[1.6rem] flex gap-[0.8rem]">
              <input
                ref={campaignTagInputRef}
                id="campaignTags"
                name="campaignTags"
                type="text"
                className="w-full rounded-[10px] border border-unfocused p-[1.5rem_0.8rem] text-[1rem] focus-visible:outline-formBtn"
                placeholder="Add hashtags or search keywords to your campaign"
                onKeyDown={handleAddCampaignTag}
              />
              <Button
                type="button"
                variant="secondary"
                className="rounded-[6px] border-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-semibold text-formBtn"
                onClick={handleAddCampaignTag}
              >
                Add
              </Button>
            </div>

            <div className="mt-[1.6rem] flex flex-col gap-[1.6rem]">
              <span className="text-[1.2rem] text-formBtn">
                {campaignTags.length}/5 tags
              </span>

              <ul className="flex flex-wrap gap-[0.8rem] text-[1.2rem] font-medium text-formBtn">
                {campaignTags.map((tag) => (
                  <li
                    key={tag}
                    className="flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] border-formBtn bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
                  >
                    <p>#{tag}</p>
                    <button
                      className=" transition-transform duration-100 active:scale-[1.12]"
                      type="button"
                      onClick={handleRemoveCampaignTags(tag)}
                    >
                      <Image
                        className="aspect-square w-[1rem]"
                        src={crossIcon as string}
                        alt="remove-tag"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ol>

        <NextButton />
      </form>
    </section>
  );
}

export default StepOne;
