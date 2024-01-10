import { cn } from "@/lib/utils";
import tickIcon from "@/public/assets/icons/campaign/tick-circle.svg";
import { useFormStore } from "@/store/formStore/formStore";
import Image from "next/image";

type StepIndicatorProps = {
  children: React.ReactNode;
  disabled?: boolean;
  isCompleted?: boolean;
};

type StepInfoProps = Pick<StepIndicatorProps, "disabled"> & {
  title: string;
  description: string;
};

function StepIndicator({
  children,
  isCompleted = false,
  disabled = false,
}: StepIndicatorProps) {
  const step = Number(children);

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
        {isCompleted ? TickIcon : children}
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

function Stepper() {
  const currentStep = useFormStore((state) => state.currentStep);

  return (
    <section className="flex gap-[1.2rem]">
      <div className="flex flex-col text-[1.2rem]">
        <StepIndicator isCompleted={currentStep > 1}>1</StepIndicator>

        <StepIndicator disabled={currentStep < 2} isCompleted={currentStep > 2}>
          2
        </StepIndicator>

        <StepIndicator disabled={currentStep < 3}>3</StepIndicator>
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

export default Stepper;
