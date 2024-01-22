import { DATE_TODAY } from "@/components/CreateCampaign/campaign.constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Button, { buttonVariants } from "../../Button/button";
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
            "mt-[1.6rem] w-full justify-between rounded-[6px] border border-unfocused p-[2.3rem_0.8rem] text-left text-[1.2rem] font-normal",
            dateValue === undefined && "text-muted-foreground",
          )}
        >
          <span>
            {isValidDeadline ? format(dateValue, "PPP") : placeholder}
          </span>

          <CalendarIcon className="aspect-square w-[1.6rem]" />
        </Button>
      </Popover.Trigger>

      <Popover.Content className="w-auto p-0">
        <Calendar
          className="rounded-[10px] border border-unfocused p-[1.2rem]"
          classNames={{
            cell: "text-[1.2rem] font-medium hover:scale-[1.03]",
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
