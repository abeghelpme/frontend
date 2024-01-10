import Button from "../primitives/Button/button";
import { toast } from "../ui/use-toast";
import TiptapEditor from "./TipTapEditor";

function StepThree() {
  return (
    <section>
      <h2 className="text-[1.6rem] font-bold text-formBtn">
        Your story matters and this is where it begins.
      </h2>

      <form className="mt-[3.2rem] flex flex-col gap-[2.4rem]">
        <div>
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
              accept="image/jpeg, image/png, image/jpg"
              multiple
              onChange={(event) => {
                const filesArray = event.target.files;

                if (filesArray === null) return;

                const allowedFileTypes = [
                  "image/jpeg",
                  "image/png",
                  "image/jpg",
                ];

                const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

                for (const fileItem of filesArray) {
                  if (!allowedFileTypes.includes(fileItem.type)) {
                    toast({
                      style: {
                        fontSize: "1.4rem",
                      },
                      title: "Error",
                      description: `File type must be ${allowedFileTypes.join(
                        ", ",
                      )}`,
                      duration: 3000,
                      variant: "destructive",
                    });
                  }

                  if (fileItem.size > FILE_SIZE_LIMIT) {
                    toast({
                      title: "Error",
                      description: "Cannot upload a file larger than 5mb",
                      duration: 3000,
                      variant: "destructive",
                    });

                    return;
                  }
                }

                if (filesArray.length > 3) {
                  toast({
                    title: "Error",
                    description: "Cannot upload more than 3 files",
                    duration: 3000,
                    variant: "destructive",
                  });

                  return;
                }
              }}
            />

            <p className="mt-[1.5rem]">Support files; PDF, JPG, CSV </p>
            <p className="text-abeg-green">Not more than 5mb</p>
          </div>
        </div>

        <div>
          <label className="text-[1.4rem] font-semibold">Campaign Story</label>

          <TiptapEditor />
        </div>
      </form>
    </section>
  );
}

export default StepThree;
