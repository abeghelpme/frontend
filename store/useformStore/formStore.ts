import { type StateCreator, create } from "zustand"
import { devtools } from "zustand/middleware"
import { useShallow } from "zustand/react/shallow"
import { STEP_DATA_KEY_LOOKUP, initialFormState } from "./constants"
import type { FormStore, SelectorFn } from "./formStore.types"

const stateObjectFn: StateCreator<FormStore> = (set, get) => ({
	...initialFormState,

	goToStep: (step) => set({ currentStep: step }),

	setData: ({ step, data }) => {
		const dataKey = STEP_DATA_KEY_LOOKUP[step]

		const { [dataKey]: previousData } = get()

		const updatedData = { ...previousData, ...data }

		set({ [dataKey]: updatedData })
	},

	initializeStoreData: (storeData) => set(storeData),
})

const useInitFormStore = create<FormStore>()(
	devtools(stateObjectFn, { name: "formStore" })
)

export const useFormStore = <TResult>(
	selector: SelectorFn<FormStore, TResult>
) => {
	const state = useInitFormStore(useShallow(selector))

	return state
}
