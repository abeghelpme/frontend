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
import { callApi, cn } from "@/lib";
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
			<header className="sticky left-0 top-0 z-10 flex items-center justify-between gap-10 border-b border-b-abeg-primary bg-white px-[5%] py-6 lg:px-[7%] 2xl:px-[10%]">
				<LogoBanner />
				<div className="flex items-center gap-3">
					<Button
						className={`!rounded-none border-r border-r-headerDivider !p-0 !pr-2 md:!px-4 lg:border-r`}
					>
						<Notification />
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex cursor-pointer items-center gap-2 md:gap-0">
								<Avatar initials={initials} />
								<Button className="ml-4 mr-2 hidden !rounded-none !p-0 !px-1 !text-black md:block">
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
										className="flex w-full items-center gap-2 rounded-md bg-abeg-primary px-2 py-2 text-sm"
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
				className={cn(
					"h-full flex-1",
					!isDashboard && "px-[5%] lg:px-[7%] 2xl:px-[10%]"
				)}
			>
				{children}
			</main>
			{!isDashboard && (
				<footer className="mt-20 border-t border-t-abeg-primary px-[5%] py-4 md:py-7 lg:px-[7%] 2xl:px-[10%]">
					{footer}
				</footer>
			)}
		</>
	);
};
