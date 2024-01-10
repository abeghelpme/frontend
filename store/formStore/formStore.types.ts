type StepOneData = {
  fundRaiserCategory: string;
  country: string;
  campaignTags: string[];
};

type StepTwoData = {
  campaignTitle: string;
  fundraisrIdentity: string;
  campaignGoal: string;
  campaignDeadline: string;
};

type StepThreeData = {
  campaignImageUrl: string;
  campaignStory: string;
};

type setDataType =
  | { step: 1; data: StepOneData }
  | { step: 2; data: StepTwoData }
  | { step: 3; data: StepThreeData };

export type FormStore = {
  currentStep: 1 | 2 | 3;
  stepOne: StepOneData | null;
  stepTwo: StepTwoData | null;
  stepThree: StepThreeData | null;

  setStepAndData: ({ step, data }: setDataType) => void;
};
