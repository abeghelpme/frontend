import { cn } from "@/lib/utils";
import tickIcon from "@/public/assets/icons/campaign/tick-circle.svg";
import type { FormStore } from "@/store/formStore";
import { useFormStore } from "@/store/formStore/formStore";
import Image from "next/image";

type StepIndicatorProps = {
  step: FormStore["currentStep"];
  disabled?: boolean;
  isCompleted?: boolean;
};

type StepInfoProps = Pick<StepIndicatorProps, "disabled"> & {
  title: string;
  description: string;
};

function StepIndicator({
  step,
  isCompleted = false,
  disabled = false,
}: StepIndicatorProps) {
  const TickIcon = (
    <Image src={tickIcon as string} alt="" width={12} height={12} />
  );

  const Separator = (
    <hr
      className={cn(
        "my-[0.4rem] basis-full border border-dashed border-formBtn",
        disabled && "border-unfocused",
      )}
    />
  );

  return (
    <div className={cn(step > 1 && "flex basis-full flex-col items-center")}>
      {step > 1 && Separator}

      <span
        className={cn(
          "grid aspect-square w-[2rem] shrink-0 place-content-center rounded-full bg-formBtn font-bold text-white",
          disabled && "bg-unfocused",
        )}
      >
        {isCompleted ? TickIcon : step}
      </span>
    </div>
  );
}

function StepInfo({ title, description, disabled = false }: StepInfoProps) {
  return (
    <article className={cn("w-full", disabled && "text-unfocused")}>
      <h5 className="text-[1.2rem] font-medium">{title}</h5>
      <p>{description}</p>
    </article>
  );
}

function StepTracker() {
  const { currentStep } = useFormStore((state) => state);

  return (
    <section className="flex gap-[1.2rem]">
      <div className="flex flex-col text-[1.2rem]">
        <StepIndicator step={1} isCompleted={currentStep > 1} />

        <StepIndicator
          step={2}
          disabled={currentStep < 2}
          isCompleted={currentStep > 2}
        />

        <StepIndicator step={3} disabled={currentStep < 3} />
      </div>

      <div className="flex flex-col items-center justify-between gap-[3.2rem] text-[1rem] text-formBtn">
        <StepInfo
          title="Basic Info"
          description="Create a campaign to fund your passion or cause"
        />

        <StepInfo
          title="Funding"
          description="Share your funding goal and deadline"
          disabled={currentStep < 2}
        />

        <StepInfo
          title="Preview"
          description="Preview your campaign"
          disabled={currentStep < 3}
        />
      </div>
    </section>
  );
}

export default StepTracker;
