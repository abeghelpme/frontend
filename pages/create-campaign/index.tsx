import {
  StepOne,
  StepThree,
  StepTracker,
  StepTwo,
} from "@/components/CreateCampaign";
import NextButton from "@/components/CreateCampaign/NextButton";
import { useFormStore } from "@/store/formStore";
import { useEffect } from "react";

const FORM_STEP_LOOKUP = {
  1: <StepOne />,
  2: <StepTwo />,
  3: <StepThree />,
};

function CreateCampaignPage() {
  const currentStep = useFormStore((state) => state.currentStep);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <main className="pt-[3.2rem]" data-rem-reset>
      <div className="flex flex-col gap-[3.2rem] border-b-[1px] border-b-formBtn px-[2.4rem] pb-[5.5rem]">
        <StepTracker />

        {FORM_STEP_LOOKUP[currentStep]}
      </div>

      <NextButton targetForm={`step-${currentStep}`} />
    </main>
  );
}

export default CreateCampaignPage;
