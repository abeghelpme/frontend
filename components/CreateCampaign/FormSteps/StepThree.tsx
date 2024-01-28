import { useFormStore, type StepThreeData } from "@/store/useformStore";
import { STEP_DATA_KEY_LOOKUP } from "@/store/useformStore/constants";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import DropZoneInput from "../DropZoneInput";
import Heading from "../Heading";
import ImagePreview from "../ImagePreview";
import TiptapEditor from "../TipTapEditor";

function StepThree() {
  const { setData, stepThreeData } = useFormStore((state) => state);

  const {
    control,
    handleSubmit,
    setValue: setFormValue,
  } = useForm({
    mode: "onTouched",
    defaultValues: stepThreeData,
  });

  const router = useRouter();

  const onFormSubmit = (data: StepThreeData) => {
    setData({ step: 3, data });

    const formData = new FormData();

    formData.set("campaignStoryHtml", data.campaignStoryHtml);
    formData.set("campaignStoryText", data.campaignStoryText);

    data.campaignImageFiles.forEach((imageFile) => {
      formData.append("campaignImages", imageFile);
    });

    void router.push("/create-campaign/preview");
  };

  return (
    <section className="w-full">
      <Heading as="h2" className="text-formBtn">
        Your story matters and this is where it begins.
      </Heading>

      <form
        id={STEP_DATA_KEY_LOOKUP[3]}
        className="mt-3.2 lg:mt-4.8"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onFormSubmit)(event);
        }}
      >
        <ol className="flex flex-col gap-2.4">
          <li>
            <label className="text-1.4 font-semibold">
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
            <label className="text-1.4 font-semibold">Campaign Story</label>

            <p className="my-1.6 text-1.2">
              A detailed description of the campaign, outlining the need for
              funding and how the funds will be used.
            </p>

            <Controller
              control={control}
              name="campaignStoryHtml"
              render={({ field }) => (
                <TiptapEditor
                  placeholder="Write a compelling story that would arouse the interest of donors..."
                  setFormValue={setFormValue}
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
