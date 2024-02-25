import {
	ArrowDown,
	Avatar,
	LogoBanner,
	NotificationIcon,
	PlusIcon,
} from "@/components/common";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui";
import { type ReactNode } from "react";
type AuthenticatedUserLayoutProps = {
	page?: "dashboard" | "campaign" | "2fa";
	children: ReactNode;
	step?: number | string;
};
export const AuthenticatedUserLayout = ({
	page,
	children,
	step,
}: AuthenticatedUserLayoutProps) => {
	return (
		<>
			<header className="flex items-center gap-10 py-4 lg:py-7 px-[5%] lg:px-[7%] xl:px-[10%] justify-between border-b border-b-abeg-primary">
				{page !== "dashboard" ? (
					<LogoBanner />
				) : (
					<div className="">
						<p className="font-semibold">Hi, FirstName👋</p>
						<p className="">
							{step == 1
								? "Here is an overview of your campaign✨."
								: step == 2
								  ? "Here is an overview of your campaign activities✨."
								  : "Here are your recent updates✨."}
						</p>
					</div>
				)}
				<div className="flex items-center gap-3">
					<Button
						variant="primary"
						className="lg:flex items-center gap-2 !text-sm !py-3 !px-2 mr-1 hidden"
					>
						<PlusIcon />
						Create Campaign
					</Button>
					<Button
						className={`!p-0 !pr-2 md:!px-4 !rounded-none  ${
							page === "dashboard"
								? "lg:border-x border-r border-r-headerDivider"
								: "border-r border-r-headerDivider"
						}`}
					>
						<NotificationIcon />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center gap-2 md:gap-0">
								<Avatar />
								<Button className="!p-0 !px-1 !text-black !rounded-none hidden md:block ml-4 mr-2">
									First Name
								</Button>
								<ArrowDown />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">shadcn</p>
									<p className="text-xs leading-none text-muted-foreground">
										m@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									Profile
									<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem className="">
									<Button className="flex items-center gap-2 !text-sm !py-3 !px-2 mr-1 lg:hidden">
										<PlusIcon />
										Create Campaign
									</Button>
								</DropdownMenuItem>
								<DropdownMenuItem>
									Settings
									<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>New Team</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								Log out
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<aside className=""></aside>
			<main className="">{children}</main>
			<footer className=""></footer>
		</>
	);
};
