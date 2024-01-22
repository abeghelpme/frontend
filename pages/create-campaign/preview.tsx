import Button from "@/components/primitives/Button/button";
import { useElementList } from "@/lib/hooks/useElementList";
import moneyIcon from "@/public/assets/icons/campaign/money.svg";
import { useFormStore } from "@/store/formStore";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function Preview() {
  const { stepOneData, stepTwoData, stepThreeData } = useFormStore(
    (state) => state,
  );

  const { For: ImageFileList } = useElementList();
  const { For: TagList } = useElementList();

  const campaignStory = stepThreeData?.campaignStory;

  if (!stepOneData || !stepTwoData || !stepThreeData) {
    return null;
  }

  const imageUrls = stepThreeData.campaignImageFiles?.map((file) =>
    URL.createObjectURL(file),
  );

  return (
    <>
      <main
        className="bg-contours bg-cover px-[2.4rem] pb-[6.2rem] pt-[3.2rem] text-successText"
        data-rem-reset
      >
        <header className="flex flex-col gap-[0.8rem]">
          <h1 className="font-semibold text-formBtn">Campaign Preview</h1>
          <p className="text-[1.4rem] text-formBtn">
            This is what your fundraiser campaign will look like to donors
          </p>
        </header>

        <section className="mt-[3.2rem]">
          <h2 className="text-[2rem] font-bold">{stepTwoData.campaignTitle}</h2>
          <Image
            src={imageUrls[0]}
            alt="campaign cover image"
            className="mt-[0.8rem] w-full rounded-[8px]"
            width={342}
            height={200}
          />

          <article className="mt-[0.8rem] flex flex-col gap-[2.8rem] p-[3rem_2.4rem]">
            <div>
              <p>₦{stepTwoData.campaignGoal} goal</p>
              <span className="mt-[0.8rem] block h-[0.6rem] rounded-[8px] bg-semiWhite" />
            </div>
            <div className="flex flex-col gap-[1.6rem]">
              <Button
                variant="primary"
                className="w-full rounded-[6px] bg-formBtn p-[1.2rem_2.4rem] text-[1.2rem] font-bold"
              >
                Donate to this campaign
              </Button>
              <Button
                variant="secondary"
                className="w-full rounded-[6px] border-formBtn p-[1.2rem_2.4rem] text-[1.2rem] font-bold text-formBtn"
              >
                Share this campaign
              </Button>
            </div>

            <div className="flex items-start gap-[0.8rem] text-[1.2rem]">
              <Image
                className="mt-[0.4rem]"
                src={moneyIcon as string}
                alt="money-icon"
                width={20}
                height={20}
              />
              <p>
                Be the first to donate to this fundraiser, every penny donated
                will go a long way
              </p>
            </div>

            <div className="flex gap-[0.8rem] text-[1.2rem] ">
              <Image
                src={""}
                className="rounded-full"
                alt="person-icon"
                width={20}
                height={20}
              />
              <p>
                {stepTwoData.fundraiserTarget ?? "Anonymous"} is in charge of
                this fundraiser.
              </p>
            </div>
          </article>
        </section>

        <section className="mt-[0.8rem]">
          <h2 className="flex gap-[1.6rem] border-b border-b-placeholder p-[0.8rem] font-bold ">
            Category:
            <span className="font-normal">
              {stepOneData.fundraiserCategory}
            </span>
          </h2>
          <h3 className="mt-[1.2rem] border-b border-b-placeholder p-[0.8rem] font-bold">
            Story
          </h3>

          <p className="mt-[2.4rem]">{campaignStory}</p>
        </section>

        <section className="mt-[2.4rem] flex flex-col gap-[2.4rem] pb-[1.6rem]">
          <h2 className="font-bold">See more pictures below:</h2>
          <div className="flex flex-col items-center gap-[2.3rem]">
            <ImageFileList
              each={imageUrls.slice(1)}
              render={(url) => (
                <Image
                  className="h-[20rem] w-[25rem] rounded-[6px] object-cover"
                  src={url}
                  alt="campaign cover image"
                  width={250}
                  height={200}
                />
              )}
            />
          </div>

          <p>
            Campaign closes on:{" "}
            {format(stepTwoData.campaignDeadline, "dd-MM-yyyy")}.
          </p>

          <ul className="grid grid-cols-2 justify-items-center gap-[2.4rem_0] font-medium">
            <TagList
              each={stepOneData.campaignTags}
              render={(tag) => <li>#{tag}</li>}
            />
          </ul>
        </section>

        <section className="mt-[3.2rem] flex items-start gap-[1.6rem]">
          <Image
            src={""}
            className="rounded-full"
            alt="person-icon"
            width={48}
            height={48}
          />

          <div>
            <p>
              {stepTwoData.fundraiserTarget || "Anonymous"} is in charge of this
              fundraiser.
              <span className="mt-[0.8rem]">{stepOneData.country}</span>
            </p>

            <Button
              variant="secondary"
              className="mt-[2.4rem] rounded-[6px] border-formBtn p-[1.2rem_1.6rem] text-[1.4rem] font-bold text-formBtn"
            >
              React out
            </Button>
          </div>
        </section>
      </main>

      <footer className="flex justify-end gap-[0.8rem] border-t border-t-formBtn p-[1.6rem_2.4rem]">
        <Button
          variant="secondary"
          className="rounded-[6px] border-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-bold text-formBtn"
        >
          <Link href={"/create-campaign"}>Edit campaign</Link>
        </Button>

        <Button
          variant="primary"
          className="rounded-[6px] bg-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-bold"
        >
          Create Campaign
        </Button>
      </footer>
    </>
  );
}

export default Preview;
