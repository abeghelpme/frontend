import {
  StepOne,
  StepThree,
  StepTwo,
  Stepper,
} from "@/components/CreateCampaign";
import { useFormStore } from "@/store/formStore";
import { useEffect } from "react";

const FORM_STEP_LOOKUP = {
  1: <StepOne />,
  2: <StepTwo />,
  3: <StepThree />,
};

function CreateCampaignPage() {
  const { currentStep } = useFormStore((state) => state);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  return (
    <main className="flex flex-col gap-[3.2rem] pt-[3.2rem]" data-rem-reset>
      <Stepper />

      {FORM_STEP_LOOKUP[currentStep]}
    </main>
  );
}

export default CreateCampaignPage;
