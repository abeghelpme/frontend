import { buttonVariants } from "@/components/primitives/Button/button";
import { cn } from "@/lib/utils/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = (props: CalendarProps) => {
  const {
    className,
    classNames,
    showOutsideDays = true,
    ...restOfProps
  } = props;

  return (
    <DayPicker
      components={{
        IconLeft: () => <ChevronLeftIcon className="size-[1.6rem]" />,
        IconRight: () => <ChevronRightIcon className="size-[1.6rem]" />,
      }}
      showOutsideDays={showOutsideDays}
      className={cn("p-[1.2rem]", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-[1.6rem] sm:space-x-[1.6rem] sm:space-y-0",
        month: "space-y-[1.6rem]",
        caption: "flex justify-center pt-[0.4rem] relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-[0.4rem] flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-[2.8rem] bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-[0.4rem]",
        nav_button_next: "absolute right-[0.4rem]",
        table: "w-full border-collapse space-y-[0.4rem]",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-[3.4rem] font-normal text-[1.1rem]",
        row: "flex w-full mt-[0.8rem]",
        cell: "size-[3.2rem] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-[3.2rem] p-0 font-normal aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...restOfProps}
    />
  );
};

export default Calendar;
