import { cn } from "@/lib/helpers/cn";
import { TickIcon } from "@/public/assets/icons/campaign";
import type { FormStore } from "@/store/useformStore";

type StepInfoProps = Pick<StepIndicatorProps, "disabled"> & {
  title: string;
  description: string;
};

type StepIndicatorProps = {
  step: FormStore["currentStep"];
  disabled?: boolean;
  isCompleted?: boolean;
};

function StepIndicator(props: StepIndicatorProps) {
  const { step, isCompleted = false, disabled = false } = props;

  const Separator = (
    <hr
      className={cn(
        "my-0.4 basis-full border border-dashed border-formBtn",
        disabled && "border-unfocused",
      )}
    />
  );

  return (
    <div className={cn(step > 1 && "flex basis-full flex-col items-center")}>
      {step > 1 && Separator}

      <span
        className={cn(
          "grid aspect-square w-2 shrink-0 place-content-center rounded-full bg-formBtn font-bold text-white",
          disabled && "bg-unfocused",
        )}
      >
        {isCompleted ? <TickIcon /> : step}
      </span>
    </div>
  );
}

function StepInformation({
  title,
  description,
  disabled = false,
}: StepInfoProps) {
  return (
    <article className={cn("w-full", disabled && "text-unfocused")}>
      <h4 className="text-1.2 font-medium lg:text-2">{title}</h4>

      <p>{description}</p>
    </article>
  );
}

export { StepIndicator, StepInformation };
