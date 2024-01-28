import Button from "@/components/primitives/Button/button";
import { Select } from "@/components/primitives/Form/Select";
import { useElementList } from "@/lib/hooks/useElementList";
import crossIcon from "@/public/assets/icons/campaign/cross-icon.svg";
import { useFormStore, type StepOneData } from "@/store/useformStore";
import { STEP_DATA_KEY_LOOKUP } from "@/store/useformStore/constants";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useRef, type KeyboardEvent, type MouseEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import Heading from "../Heading";
import { validateTagValue } from "../campaign-utils";
import {
  fundraiserCategories,
  targetCountries,
} from "../campaign-utils/constants";

function StepOne() {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { setData, goToStep, stepOneData } = useFormStore((state) => state);
  const campaignTags = stepOneData.campaignTags;

  const {
    control,
    handleSubmit,
    register,
    setValue: setFormValue,
  } = useForm({
    mode: "onTouched",
    defaultValues: stepOneData,
  });

  const { For: TagList } = useElementList();
  const { For: CategoryList } = useElementList();
  const { For: CountryList } = useElementList();

  const handleAddCampaignTag = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>,
  ) => {
    const isEnterKey = (event as KeyboardEvent).key === "Enter";

    if (event.type === "keydown" && !isEnterKey) return;

    isEnterKey && event.preventDefault();

    if (!tagInputRef.current) return;

    const validatedTag = validateTagValue(
      campaignTags,
      tagInputRef.current.value,
    );

    if (validatedTag === undefined) return;

    const newState = [...campaignTags, validatedTag];

    setData({ step: 1, data: { campaignTags: newState } });

    setFormValue("campaignTags", newState);

    tagInputRef.current.value = "";
  };

  const handleRemoveCampaignTags = (tag: string) => () => {
    const newState = campaignTags.filter((t) => t !== tag);

    setData({ step: 1, data: { campaignTags: newState } });

    setFormValue("campaignTags", newState);
  };

  const onFormSubmit = (data: StepOneData) => {
    setData({ step: 1, data });
    goToStep(2);
  };

  return (
    <section className="w-full">
      <Heading as="h2" className="text-formBtn">
        Create a campaign to fund your passion or cause.
      </Heading>

      <form
        id={STEP_DATA_KEY_LOOKUP[1]}
        className="mt-3.2"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onFormSubmit)(event);
        }}
      >
        <ol className="flex flex-col gap-2.4">
          <li>
            <label className="text-1.4 font-semibold">
              What best describes your fundraiser?
            </label>

            <Controller
              control={control}
              name="fundraiserCategory"
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <Select.Trigger
                    icon={<ChevronDownIcon />}
                    className="mt-1.6 rounded-10 border-unfocused px-0.8 py-[2.3rem] text-1 data-[placeholder]:text-placeholder lg:px-1.6 lg:py-[2.9rem] lg:text-1.6"
                  >
                    <Select.Value placeholder="Select what category best suit your fundraiser" />
                  </Select.Trigger>

                  <Select.Content>
                    <CategoryList
                      each={fundraiserCategories}
                      render={(category) => (
                        <Select.Item key={category} value={category}>
                          {category}
                        </Select.Item>
                      )}
                    />
                  </Select.Content>
                </Select.Root>
              )}
            />
          </li>

          <li>
            <label className="text-1.4 font-semibold">
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
                    className="mt-1.6 rounded-10 border-unfocused px-0.8 py-[2.3rem] text-1 data-[placeholder]:text-placeholder lg:px-1.6 lg:py-[2.9rem] lg:text-1.6"
                  >
                    <Select.Value placeholder="Select your country" />
                  </Select.Trigger>

                  <Select.Content>
                    <CountryList
                      each={targetCountries}
                      render={(country) => (
                        <Select.Item key={country} value={country}>
                          {country}
                        </Select.Item>
                      )}
                    />
                  </Select.Content>
                </Select.Root>
              )}
            />
          </li>

          <li>
            <label htmlFor="campaignTags" className="text-1.4 font-semibold">
              Campaign Tags
            </label>

            <div className="mt-1.6 flex items-center gap-0.8">
              <input
                {...register("campaignTags")}
                ref={tagInputRef}
                type="text"
                placeholder="Add hashtags or search keywords to your campaign"
                className="w-full rounded-10 border border-unfocused px-0.8 py-1.6 text-1 focus-visible:outline-formBtn lg:px-1.6 lg:py-2.4 lg:text-1.6"
                onKeyDown={handleAddCampaignTag}
              />

              <Button
                type="button"
                variant="secondary"
                className="rounded-6 border-formBtn px-1.2 py-0.8 text-1.2 font-semibold text-formBtn lg:px-2.8 lg:py-1.6 lg:text-1.6"
                onClick={handleAddCampaignTag}
              >
                Add
              </Button>
            </div>

            <div className="mt-1.6 flex flex-col gap-1.6">
              <span className="text-1.2 text-formBtn">
                {campaignTags.length}/5 tags
              </span>

              <ul className="flex flex-wrap gap-0.8 text-1.2 font-medium text-formBtn">
                <TagList
                  each={campaignTags}
                  render={(tag) => (
                    <li
                      key={tag}
                      className="flex min-w-[8rem] items-center justify-between gap-[1rem] rounded-[20px] border-[1px] border-formBtn bg-[rgb(229,242,242)] p-[0.4rem_1.2rem]"
                    >
                      <p>#{tag}</p>

                      <button
                        className="transition-transform duration-100 active:scale-[1.12]"
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
