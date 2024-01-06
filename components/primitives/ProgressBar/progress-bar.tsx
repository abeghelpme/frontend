import { cn } from "@/lib/utils/cn";
import type { FC } from "react";

interface ProgressBarProps {
  value: number;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, className, ...props }) => {
  return (
    <progress
      className={cn(
        "w-full appearance-none border-none progress-unfilled:h-2 progress-unfilled:rounded-[4px] progress-unfilled:bg-abeg-neutral-80 progress-filled:rounded-[4px] progress-filled:bg-abeg-green",
        className,
      )}
      id="target"
      value={`${value}`}
      max="100"
      {...props}
    >
      {value + "%"}
    </progress>
  );
};

export default ProgressBar;
