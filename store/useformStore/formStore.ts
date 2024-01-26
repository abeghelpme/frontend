import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { initialFormState, STEP_DATA_KEY_LOOKUP } from "./constants";
import type { FormStore, SelectorFn } from "./formStore.types";

const stateObjectFn: StateCreator<FormStore> = (set, get) => ({
  ...initialFormState,

  goToStep: (step) => set({ currentStep: step }),

  setData: ({ step, data }) => {
    const stepDataKey = STEP_DATA_KEY_LOOKUP[step];

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
