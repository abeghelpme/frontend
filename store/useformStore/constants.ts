import { DATE_TODAY } from "@/components/CreateCampaign/campaign-utils/constants";
import type { FormStore } from "./formStore.types";

type FormState = Pick<
  FormStore,
  "currentStep" | "stepOneData" | "stepTwoData" | "stepThreeData"
>;

export const initialFormState = {
  currentStep: 1,

  stepOneData: {
    fundraiserCategory: "",
    country: "",
    campaignTags: [],
  },

  stepTwoData: {
    campaignTitle: "",
    fundraiserTarget: "",
    campaignGoal: "0",
    campaignDeadline: DATE_TODAY,
  },

  stepThreeData: {
    campaignImageFiles: [],
    campaignStoryHtml: "",
    campaignStoryText: "",
  },
} satisfies FormState;

export const STEP_DATA_KEY_LOOKUP = {
  1: "stepOneData",
  2: "stepTwoData",
  3: "stepThreeData",
} as const;
