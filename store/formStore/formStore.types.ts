export type JSONContent = {
  [key: string]: NonNullable<unknown> | undefined;
  type?: string;
  attrs?: Record<string, NonNullable<unknown>>;
  content?: JSONContent[];

  marks?: Array<{
    [key: string]: NonNullable<unknown> | undefined;
    type: string;
    attrs?: JSONContent["attrs"];
  }>;

  text?: string;
};

export type StepOneData = {
  fundraiserCategory: string;
  country: string;
  campaignTags: string[];
};

export type StepTwoData = {
  campaignTitle: string;
  fundraiserTarget: string;
  campaignGoal: string;
  campaignDeadline: Date;
};

export type StepThreeData = {
  campaignImage: string;
  campaignStory: JSONContent;
};

type SetDataParams =
  | { step: 1; data: StepOneData; nextStep?: 2 }
  | { step: 2; data: StepTwoData; nextStep?: 3 }
  | { step: 3; data: StepThreeData };

export type FormStore = {
  currentStep: SetDataParams["step"];
  stepOneData: StepOneData | null;
  stepTwoData: StepTwoData | null;
  stepThreeData: StepThreeData | null;

  setData: (paramsObj: SetDataParams) => void;
  initializeStoreData: () => Promise<void>;
};

export type SelectorFn<TState> = (state: FormStore) => TState;
