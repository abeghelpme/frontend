import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
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

  goToStep: (step) => set({ currentStep: step }),

  setData: ({ step, data }) => {
    const stepDataKey = FORM_STEP_KEY_LOOKUP[step];

    const { [stepDataKey]: prevData } = get();

    set({ [stepDataKey]: { ...prevData, ...data } });
  },

  initializeStoreData: (storeData) => set(storeData),
});

const useInitStore = create<FormStore>()(
  devtools(stateObjectFn, { name: "formStore" }),
);

export const useFormStore = <TState>(selector: SelectorFn<TState>) => {
  const state = useInitStore(useShallow(selector));

  return state;
};
