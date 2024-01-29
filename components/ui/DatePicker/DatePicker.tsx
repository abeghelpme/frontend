import { DATE_TODAY } from "@/components/CreateCampaign/campaign-utils/constants";
import { cn } from "@/lib/helpers/cn";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Button, { buttonVariants } from "../button";
import Calendar from "./Calender";
import { Popover } from "./Popover";

type DatePickerProps = {
  placeholder?: string;
  dateValue?: Date;
  onChange?: (dateValue?: Date) => void;
};

const DatePicker = ({ placeholder, dateValue, onChange }: DatePickerProps) => {
  const isValidDeadline = dateValue !== undefined && dateValue !== DATE_TODAY;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="secondary"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-1.6 w-full justify-between rounded-10 border border-unfocused px-0.8 py-2.3 text-left text-1.2 font-normal",
            dateValue === undefined && "text-muted-foreground",
          )}
        >
          <span>
            {isValidDeadline ? format(dateValue, "PPP") : placeholder}
          </span>

          <CalendarIcon className="aspect-square w-1.6" />
        </Button>
      </Popover.Trigger>

      <Popover.Content className="w-auto p-0">
        <Calendar
          className="rounded-10 border border-unfocused p-1.2"
          classNames={{
            cell: "hover:scale-[1.03]",
            button: "text-1.2 font-medium",
          }}
          mode="single"
          selected={dateValue}
          onSelect={onChange}
          initialFocus={true}
          disabled={{ before: DATE_TODAY }}
        />
      </Popover.Content>
    </Popover.Root>
  );
};

export default DatePicker;
