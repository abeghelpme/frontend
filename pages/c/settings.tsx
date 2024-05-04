import {
	AccountIcon,
	BillingIcon,
	NotificationIcon,
} from "@/components/common";
import {
	Account,
	Billing,
	Notification,
} from "@/components/dashboard/settings";
import { AuthenticatedUserLayout } from "@/layouts";
import { title } from "process";
import { useState } from "react";

const sideBarItems = [
	{ title: "Account", icon: <AccountIcon />, option: "account" },
	{ title: "Notification", icon: <NotificationIcon />, option: "notification" },
	{ title: "Billing and Payments", icon: <BillingIcon />, option: "billing" },
];

type ObjectLookUpData = {
	id: "account" | "notification" | "billing";
	element: React.ReactNode;
};

type ObjectLookUpMap = {
	[key: string]: ObjectLookUpData;
};

const objectLookUp: ObjectLookUpMap = {
	account: { element: <Account />, id: "account" },
	notification: { element: <Notification />, id: "notification" },
	billing: { element: <Billing />, id: "billing" },
};

const settings = () => {
	const [option, setOption] = useState("account");
	const changeOption = (value: string) => setOption(value);
	return (
		<AuthenticatedUserLayout isDashboard>
			<div className="flex flex-col gap-6">
				<h1 className="text-2xl font-extrabold text-white ">Settings</h1>
				<div className="flex w-full shadow-lg rounded-lg bg-white p-4 md:p-6 relative gap-6">
					<div className="sticky top-48 max-h-56">
						<div className=" md:min-w-64 xl:min-w-80 flex flex-col gap-4 ">
							{sideBarItems.map((item, id) => {
								return (
									<div
										key={id}
										className="flex gap-3 items-center hover:cursor-pointer"
										onClick={() => changeOption(item.option)}
									>
										<div
											className={`w-1 bg-abeg-primary rounded-md h-8 transition-opacity duration-500 ${
												option === item.option ? "opacity-100" : "opacity-0"
											}`}
										></div>
										<div
											className={`flex gap-2 items-center rounded-lg w-full p-2  transition-colors duration-500 hover:bg-[#D0D7DE3D] text-base ${
												option === item.option
													? "bg-[#D0D7DE3D] font-semibold"
													: ""
											}`}
										>
											{item.icon}
											<p>{item.title}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="flex-1 border-l-[1px] pl-6">
						{objectLookUp[option].element}
					</div>
				</div>
			</div>
		</AuthenticatedUserLayout>
	);
};
export default settings;
