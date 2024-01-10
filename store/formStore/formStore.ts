import { create, type StateCreator } from "zustand";
import type { FormStore } from "./formStore.types";

const STEP_LOOKUP = {
  1: "stepOne",
  2: "stepTwo",
  3: "stepThree",
} as const;

const stateObjectFn: StateCreator<FormStore> = (set) => ({
  currentStep: 1,
  stepOne: null,
  stepTwo: null,
  stepThree: null,

  setStepAndData: ({ step, data }) => {
    set({ currentStep: step, [STEP_LOOKUP[step]]: data });
  },
});

export const useFormStore = create<FormStore>()(stateObjectFn);
