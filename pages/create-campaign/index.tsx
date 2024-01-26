import {
  StepOne,
  StepThree,
  StepTracker,
  StepTwo,
} from "@/components/CreateCampaign";
import FormActionButton from "@/components/CreateCampaign/FormActionButton";
import { useFormStore, type FormStore } from "@/store/useformStore";
import { STEP_DATA_KEY_LOOKUP } from "@/store/useformStore/constants";
import { useEffect } from "react";

const STEP_COMPONENT_LOOKUP = {
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
    <>
      <main
        className="flex flex-col gap-3.2 bg-contours bg-cover px-2.4 pb-5.5 pt-3.2"
        data-rem-reset
      >
        <StepTracker />

        {STEP_COMPONENT_LOOKUP[currentStep]}
      </main>

      <footer className="flex items-center justify-between border-t border-t-formBtn px-2.4 py-1.6">
        <FormActionButton
          type="button"
          text="Go Back"
          className="min-w-[7.8rem]"
          disabled={currentStep === 1}
          onClick={() =>
            goToStep((currentStep - 1) as FormStore["currentStep"])
          }
        />

        <FormActionButton
          type="submit"
          text="Continue"
          targetForm={STEP_DATA_KEY_LOOKUP[currentStep]}
        />
      </footer>
    </>
  );
}

export default CreateCampaignPage;
