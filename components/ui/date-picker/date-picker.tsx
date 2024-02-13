import { DATE_TOMORROW } from "@/components/CreateCampaign/campaign-utils/constants";
import { getDateFromString } from "@/components/CreateCampaign/campaign-utils/getDateFromString";
import { cn } from "@/lib";
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

	const isValidDeadline = dateValue !== DATE_TOMORROW;

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button
					variant="secondary"
					className={cn(
						buttonVariants({ variant: "outline" }),
						dateValueString === "" && "text-placeholder",
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
						button: "font-medium text-[1.26rem]",
					}}
					mode="single"
					selected={dateValue}
					onSelect={(date) => {
						if (!date) return;

						onChange(date.toISOString().split("T")[0]);
					}}
					initialFocus={true}
					disabled={{ before: DATE_TOMORROW }}
				/>
			</Popover.Content>
		</Popover.Root>
	);
}

export default DatePicker;
