import { useFormStore } from "@/store/formStore/formStore";
import type { StepThreeData } from "@/store/formStore/formStore.types";
import { Controller, useForm } from "react-hook-form";
import Button from "../primitives/Button/button";
import { toast } from "../ui/use-toast";
import NextButton from "./NextButton";
import TiptapEditor from "./TipTapEditor";

const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

const acceptedFilesString = allowedFileTypes.join(", ");

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

function StepThree() {
  const { setData, stepThreeData } = useFormStore((state) => state);

  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched",
    defaultValues: stepThreeData ?? {},
  });

  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      toast({
        title: "Error",
        className: "text-[1.4rem]",
        description: "No file selected",
        duration: 3000,
        variant: "destructive",
      });

      return;
    }

    const fileList = event.target.files;

    for (const file of fileList) {
      if (!allowedFileTypes.includes(file.type)) {
        toast({
          title: "Error",
          className: "text-[2rem]",
          description: `File type must be of ${acceptedFilesString}`,
          duration: 3000,
          variant: "destructive",
        });

        return;
      }

      if (file.size > FILE_SIZE_LIMIT) {
        toast({
          title: "Error",
          className: "text-[1.4rem]",
          description: "Cannot upload a file larger than 5mb",
          duration: 3000,
          variant: "destructive",
        });

        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        console.log(reader.result);
      };
    }
  };

  const onSubmit = (data: StepThreeData) => {
    setData({ step: 3, data });

    reset();
  };

  return (
    <section>
      <h2 className="px-[2.4rem] text-[1.6rem] font-bold text-formBtn">
        Your story matters and this is where it begins.
      </h2>

      <form
        className="mt-[3.2rem] flex flex-col gap-[4rem]"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(onSubmit)(event);
        }}
      >
        <ol className="flex flex-col gap-[2.4rem] px-[2.4rem]">
          <li>
            <label className="text-[1.4rem] font-semibold">
              Campaign Cover Image
            </label>

            <div className="relative mt-[1.6rem] flex min-h-[16.1rem] flex-col items-center justify-end rounded-[5px] border border-dashed border-formBtn py-[1.5rem] text-[1rem]">
              <Button
                variant="primary"
                className=" bg-formBtn p-[0.8rem] text-[1.2rem] font-bold "
                type="button"
              >
                Upload
              </Button>

              <input
                className="absolute inset-0 cursor-pointer opacity-0"
                type="file"
                accept={acceptedFilesString}
                onChange={imageUpload}
                multiple
              />
              <p className="mt-[1.5rem]">Support files; PDF, JPG, CSV </p>
              <p className="text-abeg-green">Not more than 5mb</p>
            </div>
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

        <NextButton />
      </form>
    </section>
  );
}

export default StepThree;
