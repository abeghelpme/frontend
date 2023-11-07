import clsx from "clsx";
import { FC, HTMLProps } from "react";

interface ProgressBarProps {
  value: string; // Provide the progress value as a number (0-100)
  props?: HTMLProps<HTMLProgressElement>;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, className, ...props }) => {
  return (
    <progress
      className={clsx(
        className,
        "appearance-none bg-abeg-neutral-80 h-2 rounded-[4px] w-full border-none mx-9",
      )}
      id="target"
      value={value}
      {...props}
      max="100"
    >
      {value + "%"}
    </progress>
  );
};

export default ProgressBar;
