import {
  StepOne,
  StepThree,
  StepTracker,
  StepTwo,
} from "@/components/CreateCampaign";
import FormActionButton from "@/components/CreateCampaign/FormActionButton";
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
    <>
      <main
        className="flex flex-col gap-[3.2rem] bg-contours bg-cover px-[2.4rem] pb-[5.5rem] pt-[3.2rem]"
        data-rem-reset
      >
        <StepTracker />

        {FORM_STEP_LOOKUP[currentStep]}
      </main>

      <footer className="flex items-center justify-between border-t border-t-formBtn p-[1.6rem_2.4rem]">
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
          targetForm={FORM_STEP_KEY_LOOKUP[currentStep]}
        />
      </footer>
    </>
  );
}

export default CreateCampaignPage;
