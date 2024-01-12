import { create, type StateCreator } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { FormStore, SelectorFn } from "./formStore.types";

const STEP_LOOKUP = {
  1: "stepOneData",
  2: "stepTwoData",
  3: "stepThreeData",
};

const stateObjectFn: StateCreator<FormStore> = (set) => ({
  currentStep: 1,
  stepOneData: null,
  stepTwoData: null,
  stepThreeData: null,

  setData: (paramsObj) => {
    const { step, data } = paramsObj;

    set({ [STEP_LOOKUP[step]]: data });

    if ("nextStep" in paramsObj && paramsObj.nextStep) {
      set({ currentStep: paramsObj.nextStep });
    }
  },

  initializeStoreData: async () => {},
});

const useInitStore = create<FormStore>()(stateObjectFn);

export const useFormStore = <TState>(selector: SelectorFn<TState>) => {
  const state = useInitStore(useShallow(selector));

  return state;
};
