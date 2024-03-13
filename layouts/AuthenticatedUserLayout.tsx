import {
	ArrowDown,
	Avatar,
	LogoBanner,
	Notification,
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
	DropdownMenuTrigger,
} from "@/components/ui";
import type { User } from "@/interfaces";
import { callApi } from "@/lib";
import { useSession } from "@/store";
import Link from "next/link";
import { type ReactNode } from "react";
type AuthenticatedUserLayoutProps = {
	isDashboard?: boolean;
	children: ReactNode;
	footer?: ReactNode;
};
export const AuthenticatedUserLayout = ({
	isDashboard,
	children,
	footer,
}: AuthenticatedUserLayoutProps) => {
	const {
		user,
		actions: { clearSession },
	} = useSession((state) => state);
	const castedUser = user as User;
	const initials = castedUser?.firstName[0] + castedUser?.lastName[0];
	return (
		<>
			<header className="sticky top-0 left-0 bg-white z-10 flex items-center gap-10 py-6 px-[5%] lg:px-[7%] xl:px-[10%] justify-between border-b border-b-abeg-primary">
				<LogoBanner />
				<div className="flex items-center gap-3">
					<Button
						className={`!p-0 !pr-2 md:!px-4 !rounded-none lg:border-r border-r border-r-headerDivider`}
					>
						<Notification />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center gap-2 md:gap-0 cursor-pointer">
								<Avatar initials={initials} />
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
									<Link href="/dashboard" className="">
										Dashboard
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem className="lg:hidden">
									<Link
										href="/dashboard"
										className="flex w-full items-center bg-abeg-primary rounded-md gap-2 text-sm py-2 px-2"
									>
										<PlusIcon />
										Create Campaign
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Button
									variant="danger"
									onClick={async () => {
										const { data, error } = await callApi("/auth/signout");
										clearSession();
									}}
									fullWidth
									className="!py-2"
								>
									Signout
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main
				className={`flex-1 h-full${
					!isDashboard && "px-[5%] lg:px-[7%] xl:px-[10%]"
				}`}
			>
				{children}
			</main>
			{!isDashboard && (
				<footer className="mt-20 border-t px-[5%] lg:px-[7%] xl:px-[10%] border-t-abeg-primary py-4 md:py-7">
					{footer}
				</footer>
			)}
		</>
	);
};
