import { Select } from "@/components/primitives/Form/Select";
import closeCircle from "@/public/assets/icons/campaign/close-circle.svg";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRef, useState } from "react";

function StepOne() {
  const [campaignTags, setCampaignTags] = useState<string[]>([]);
  const campaignTagInputRef = useRef<HTMLInputElement>(null);

  const handleCampaignTagAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!campaignTagInputRef.current) return;

    if (campaignTags.includes(campaignTagInputRef.current.value)) return; //TODO - show error

    if (campaignTags.length >= 5) return; //TODO - show error

    setCampaignTags([...campaignTags, campaignTagInputRef.current.value]);

    campaignTagInputRef.current.value = "";
  };

  const handleRemoveTags = (tag: string) => () => {
    setCampaignTags(campaignTags.filter((t) => t !== tag));
  };

  const RenderedTags = campaignTags.map((tag) => (
    <li
      key={tag}
      className="flex min-w-[10rem] items-center justify-between gap-[1rem] rounded-[6px] border-[1px] border-formBtn p-[0.8rem]"
    >
      <p>#{tag}</p>

      <button
        className="aspect-square w-[1.8rem] transition-transform duration-100 active:scale-[1.08]"
        type="button"
        onClick={handleRemoveTags(tag)}
      >
        <Image src={closeCircle as string} alt="remove tag" />
      </button>
    </li>
  ));

  return (
    <section>
      <h2 className="text-[1.6rem] font-bold text-formBtn">
        Create a campaign to fund your passion or cause.
      </h2>

      <form className="mt-[3.2rem] flex flex-col gap-[2.4rem]">
        <div>
          <label htmlFor="category" className="text-[1.4rem] font-[600]">
            What best describes your fundraiser?
          </label>

          <Select.Root>
            <Select.Trigger
              icon={<ChevronDownIcon opacity={0.5} />}
              className="mt-[1.6rem] rounded-[10px] p-[1.5rem_0.8rem]"
            >
              <Select.Value placeholder="Select what category best suit your fundraiser" />
            </Select.Trigger>

            <Select.Content id="category">
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="grapes">Grapes</Select.Item>
              <Select.Item value="pineapple">Pineapple</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div>
          <label className="text-[1.4rem] font-[600]">
            What country are you located?
          </label>

          <Select.Root>
            <Select.Trigger
              icon={<ChevronDownIcon opacity={0.5} />}
              className="mt-[1.6rem] rounded-[10px] p-[1.5rem_0.8rem]"
            >
              <Select.Value placeholder="Select your country" />
            </Select.Trigger>

            <Select.Content id="category">
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="grapes">Grapes</Select.Item>
              <Select.Item value="pineapple">Pineapple</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </form>

      <form
        className="mt-[2.4rem] flex flex-col gap-[1.6rem]"
        onSubmit={handleCampaignTagAdd}
      >
        <label className="text-[1.4rem] font-[600]">Campaign Tags</label>

        <div className="flex gap-[1.6rem]">
          <input
            ref={campaignTagInputRef}
            type="text"
            className="w-full rounded-[10px] border-[1px] border-formBtn p-[1.5rem_0.8rem] text-[1.0rem] focus-visible:outline-formBtn"
          />

          <button
            type="submit"
            className="rounded-[6px] border-[1px] border-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-[600] text-formBtn"
          >
            Add
          </button>
        </div>

        <p className="text-[1.2rem] text-formBtn">
          {campaignTags.length}/5 tags
        </p>

        <ul className="flex min-h-[3.6rem] flex-wrap gap-[0.8rem] text-[1.2rem] font-[500] text-formBtn">
          {RenderedTags}
        </ul>
      </form>
    </section>
  );
}

export default StepOne;
