import { create, type StateCreator } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { FormStore, SelectorFn } from "./formStore.types";

export const FORM_STEP_KEY_LOOKUP = {
  1: "stepOneData",
  2: "stepTwoData",
  3: "stepThreeData",
} as const;

const stateObjectFn: StateCreator<FormStore> = (set, get) => ({
  currentStep: 1,
  stepOneData: null,
  stepTwoData: null,
  stepThreeData: null,

  setData: (paramsObj) => {
    const { step, data } = paramsObj;
    const stepDataKey = FORM_STEP_KEY_LOOKUP[step];

    const { [stepDataKey]: prevData } = get();

    set({ [stepDataKey]: { ...prevData, ...data } });

    if ("nextStep" in paramsObj) {
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
