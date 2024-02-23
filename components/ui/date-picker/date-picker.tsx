import { cn } from "@/lib";
import { DATE_TOMORROW } from "@/lib/helpers/campaign/constants";
import { getDateFromString } from "@/lib/helpers/campaign/getDateFromString";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Button, { buttonVariants } from "../button";
import Calendar from "./calender";
import { Popover } from "./popover";

type DatePickerProps = {
	className?: string;
	placeholder?: string;
	dateValueString: string;
	onChange: (dateValueString?: string) => void;
};

function DatePicker(props: DatePickerProps) {
	const { placeholder, dateValueString = "", className, onChange } = props;

	const dateValue = getDateFromString(dateValueString);

	const isDateSelected = dateValueString !== "";

	return (
		<Popover.Root>
			div
			<Popover.Trigger asChild>
				<Button
					variant="secondary"
					className={cn(
						buttonVariants({ variant: "outline" }),
						!isDateSelected && "text-placeholder",
						className
					)}
				>
					<span>{isDateSelected ? format(dateValue, "PPP") : placeholder}</span>

					<CalendarIcon className="aspect-square w-@1.6" />
				</Button>
			</Popover.Trigger>
			<Popover.Content className="w-auto p-0">
				<Calendar
					className="rounded-[10px] border border-unfocused p-@1.2"
					classNames={{
						cell: "hover:scale-[1.03]",
						button: "font-medium text-[0.7875rem]",
					}}
					mode="single"
					selected={dateValue}
					onSelect={(date) => {
						if (!date) return;

						onChange(format(date, "MM-dd-yyyy"));
					}}
					initialFocus={true}
					disabled={{ before: DATE_TOMORROW }}
				/>
			</Popover.Content>
		</Popover.Root>
	);
}

export default DatePicker;
