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
import type { User } from "@/interfaces";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import { type ReactNode } from "react";

type AuthenticatedUserLayoutProps = {
	page?: "dashboard" | "other";
	children: ReactNode;
	footer?: ReactNode;
};
export const AuthenticatedUserLayout = ({
	page,
	children,
	footer,
}: AuthenticatedUserLayoutProps) => {
	const {
		user,
		actions: { clearSession },
	} = useSession((state) => state);
	const castedUser = user as User;
	return (
		<>
			<header className="sticky top-0 left-0 bg-white z-10 flex items-center gap-10 py-4 lg:py-7 px-[5%] lg:px-[7%] xl:px-[10%] justify-between border-b border-b-abeg-primary">
				<LogoBanner />
				{/* {page !== 'dashboard' ? (
				) : (
					<div className="">
						<p className="font-semibold">Hi, FirstName👋</p>
						<p className="">
							{step == 1
								? 'Here is an overview of your campaign✨.'
								: step == 2
								? 'Here is an overview of your campaign activities✨.'
								: 'Here are your recent updates✨.'}
						</p>
					</div>
				)} */}

				<div className="flex items-center gap-3">
					<Button
						className={`!p-0 !pr-2 md:!px-4 !rounded-none lg:border-r border-r border-r-headerDivider`}
					>
						<NotificationIcon />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center gap-2 md:gap-0 cursor-pointer">
								<Avatar />
								<Button className="!p-0 !px-1 !text-black !rounded-none hidden md:block ml-4 mr-2">
									{castedUser?.firstName || "First Name"}
								</Button>
								<span className="cursor-pointer" aria-hidden>
									<ArrowDown />
								</span>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">Profile</p>
									<p className="text-xs leading-none text-muted-foreground">
										{castedUser?.email || "m@example.com"}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									Profile
									<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem className="lg:hidden">
									<Button className="flex items-center gap-2 !text-sm !py-3 !px-2 mr-1">
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
								<Button
									variant="danger"
									onClick={async () => {
										const { data, error } = await callApi("/auth/signout");
										clearSession();
									}}
									className="w-3/4 "
								>
									Signout
								</Button>
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<aside className=""></aside>
			<main className="flex-1 h-full px-[5%] lg:px-[7%] xl:px-[10%]">
				{children}
			</main>
			{page !== "dashboard" && (
				<footer className="mt-20 border-t px-[5%] lg:px-[7%] xl:px-[10%] border-t-abeg-primary py-4 md:py-7">
					{footer}
				</footer>
			)}
		</>
	);
};
