import { cn } from "@/lib/helpers/cn";
import Button from "../ui/button";

type NextButtonProps = {
  targetForm?: string;
  type: "button" | "submit";
  text: string;
  className?: string;
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
        "rounded-6 bg-formBtn px-1.2 py-0.8 text-1.2 font-semibold lg:rounded-8 lg:px-2.4 lg:py-1.4 lg:text-1.4 lg:font-bold",
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
