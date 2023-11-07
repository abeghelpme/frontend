import getAvatarInitials from "@/lib/utils/get-avatar-initials";
import { FC } from "react";
import Avatar, { type AvatarProps } from "../primitives/Avatar/avatar";
import { cn } from "@/lib/utils/cn";

interface StackedAvatarsProps extends AvatarProps {
  // NOTE: Temporary `user` property type, should be replace with neccesary object wth user details
  users: { name: string; img: string }[];
  count?: number;
  displayOthersCount?: boolean;
}

const StackedAvatars: FC<StackedAvatarsProps> = ({
  users,
  count = 5,
  className,
  size = "base",
  displayOthersCount,
  ...props
}) => (
  <div className="flex -space-x-3 hover:-space-x-1">
    {users
      ?.slice(0, count)
      .map((user, i) => (
        <Avatar
          key={i}
          className={cn("transition-all duration-300", className)}
          src={user.img}
          size={size}
          initials={getAvatarInitials(user.name)}
          {...props}
        />
      ))}
    {displayOthersCount === true && users.length > count && (
      <Avatar
        className={cn("transition-all duration-300", className)}
        size={size}
        initials={`+${users.length - count}`}
        {...props}
      />
    )}
  </div>
);

export default StackedAvatars;
