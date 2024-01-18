import {
  StepOne,
  StepThree,
  StepTracker,
  StepTwo,
} from "@/components/CreateCampaign";
import FormActionButton from "@/components/CreateCampaign/FormControlButton";
import {
  FORM_STEP_KEY_LOOKUP,
  useFormStore,
  type FormStore,
} from "@/store/formStore";
import { useEffect } from "react";

const FORM_STEP_LOOKUP = {
  1: <StepOne />,
  2: <StepTwo />,
  3: <StepThree />,
};

function CreateCampaignPage() {
  const { currentStep, goToStep } = useFormStore((state) => state);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <main className="bg-contours bg-cover pt-[3.2rem]" data-rem-reset>
      <div className="flex flex-col gap-[3.2rem] border-b-[1px] border-b-formBtn px-[2.4rem] pb-[5.5rem]">
        <StepTracker />

        {FORM_STEP_LOOKUP[currentStep]}
      </div>

      <div className="flex items-center justify-between p-[1.6rem_2.4rem]">
        <FormActionButton
          type="button"
          text="Go Back"
          className="min-w-[7.8rem]"
          onClick={() =>
            goToStep((currentStep - 1) as FormStore["currentStep"])
          }
          disabled={currentStep === 1}
        />

        <FormActionButton
          type="submit"
          text="Continue"
          targetForm={FORM_STEP_KEY_LOOKUP[currentStep]}
        />
      </div>
    </main>
  );
}

export default CreateCampaignPage;
