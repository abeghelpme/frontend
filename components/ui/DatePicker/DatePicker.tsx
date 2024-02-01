import { DATE_TODAY } from "@/components/CreateCampaign/campaign-utils/constants";
import { cn } from "@/lib/helpers/cn";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Button, { buttonVariants } from "../button";
import Calendar from "./Calender";
import { Popover } from "./Popover";

type DatePickerProps = {
	className?: string;
	placeholder?: string;
	dateValue?: Date;
	onChange?: (dateValue?: Date) => void;
};

const DatePicker = (props: DatePickerProps) => {
	const { placeholder, dateValue, className, onChange } = props;

	const isValidDeadline = dateValue !== undefined && dateValue !== DATE_TODAY;

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button
					variant="secondary"
					className={cn(
						buttonVariants({ variant: "outline" }),
						dateValue === undefined && "text-muted-foreground",

						className
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
						button: "font-medium text-[1.25rem]",
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
