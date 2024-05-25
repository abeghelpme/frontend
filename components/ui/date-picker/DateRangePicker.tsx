import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import * as React from "react";

import { cn } from "@/lib";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";
import type { DateRange } from "react-day-picker";
import Button from "../button";
import Calendar from "./calender";

export function DateRangePicker({
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(2024, 0, 1),
		to: addDays(new Date(2024, 0, 20), 20),
	});

	return (
		<div className={cn("", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"regular"}
						className={cn(
							"w-fit justify-start rounded-lg bg-white p-2 text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="mt-2 w-auto rounded-lg border border-abeg-primary bg-white p-0"
					align="end"
				>
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
