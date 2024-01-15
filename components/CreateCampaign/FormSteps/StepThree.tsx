import { useFormStore } from "@/store/formStore/formStore";
import type { StepThreeData } from "@/store/formStore/formStore.types";
import { Controller, useForm } from "react-hook-form";
import DropZoneInput from "../DropZoneInput";
import ImagePreview from "../ImagePreview";
import TiptapEditor from "../TipTapEditor";

function StepThree() {
  const { setData, stepThreeData } = useFormStore((state) => state);

  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: stepThreeData ?? {},
  });

  const onSubmit = (data: StepThreeData) => {
    if (data.campaignImageFiles == null) return; //TODO - show error

    setData({ step: 3, data });

    const formData = new FormData();

    formData.set("campaignStory", JSON.stringify(data.campaignStory));

    data.campaignImageFiles.forEach((imageFile) => {
      formData.append("campaignImages", imageFile);
    });
  };

  return (
    <section>
      <h2 className="text-[1.6rem] font-bold text-formBtn">
        Your story matters and this is where it begins.
      </h2>

      <form
        id="step-3"
        className="mt-[3.2rem]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
      >
        <ol className="flex flex-col gap-[2.4rem]">
          <li>
            <label className="text-[1.4rem] font-semibold">
              Campaign Cover Image
            </label>

            <Controller
              control={control}
              name="campaignImageFiles"
              render={({ field }) => (
                <>
                  <DropZoneInput
                    value={field.value}
                    onChange={field.onChange}
                  />

                  <ImagePreview value={field.value} onChange={field.onChange} />
                </>
              )}
            />
          </li>

          <li>
            <label className="text-[1.4rem] font-semibold">
              Campaign Story
            </label>

            <p className="my-[1.6rem] text-[1.2rem]">
              A detailed description of the campaign, outlining the need for
              funding and how the funds will be used.
            </p>

            <Controller
              control={control}
              name="campaignStory"
              render={({ field }) => (
                <TiptapEditor
                  placeholder="Write a compelling story that would arouse the interest of donors..."
                  editorContent={field.value}
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

export default StepThree;
