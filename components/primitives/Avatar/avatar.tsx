import { cn } from "@/lib/utils/cn";
import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import type { FC, CSSProperties } from "react";

export interface AvatarProps {
  className?: string;
  src?: string;
  initials?: string;
  alt?: string;
  size?: "sm" | "base" | "lg" | number;
  hasBorder?: boolean;
  isCircle?: boolean;
  style?: CSSProperties;
}

const Avatar: FC<AvatarProps> = (props) => {
  switch (typeof props.size) {
    case "number":
      return (
        <TheComponent
          {...props}
          style={{ width: props.size, height: props.size }}
        />
      );
    case "string":
      return <TheComponent {...props} />;
  }
};

export default Avatar;

const TheComponent: FC<AvatarProps> = ({
  className,
  src,
  initials,
  alt,
  size = "base",
  hasBorder = false,
  isCircle = true,
  ...props
}) => {
  const style = {
    root: "inline-flex select-none items-center justify-center align-middle",
    sm: "h-6 w-6",
    base: "h-8 w-8",
    lg: "h-12 w-12",
    circular: "overflow-hidden rounded-full",
    bordered: "border border-solid border-abeg-neutral-60",
  };

  return (
    <Root
      className={cn(
        style.root,
        isCircle === true && style.circular,
        hasBorder === true && style.bordered,
        typeof size === "string" && style[size],
        className,
      )}
      {...props}
    >
      <Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={src}
        alt={(alt ?? "") || initials}
      />
      <Fallback
        className={cn(
          "text-abeg-neutral-40 leading-1 flex items-center justify-center h-full w-full text-center bg-white font-medium",
          typeof size === "string" && size === "sm"
            ? "text-xs"
            : `text-${size}`,
        )}
        delayMs={600}
        style={{
          fontSize: `${typeof size === "number" && size / 2 + "px"}`,
        }}
      >
        <span>{initials}</span>
      </Fallback>
    </Root>
  );
};
