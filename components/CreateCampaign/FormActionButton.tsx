import { cn } from "@/lib/utils/cn";
import Button from "../primitives/Button/button";

type NextButtonProps = {
  targetForm?: string;
  text: string;
  className?: string;
  type: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

function FormActionButton({
  targetForm,
  text,
  className,
  type,
  disabled = false,
  onClick,
}: NextButtonProps) {
  return (
    <Button
      form={targetForm}
      type={type}
      variant="primary"
      className={cn(
        "ounded-6 bg-formBtn px-1.2 py-0.8 text-[1.2rem] font-semibold",
        disabled && "cursor-not-allowed bg-unfocused",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

export default FormActionButton;
