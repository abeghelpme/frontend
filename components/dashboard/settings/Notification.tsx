import { Button, Checkbox, Switch } from "@/components/ui";
import { useState } from "react";

const Notification = () => {
	const [values, setValues] = useState({
		emailNotification: false,
		news: false,
		tips: false,
		offers: false,
	});
	const checkBoxes = [
		{
			id: "news",
			title: "News & Update Settings",
			description: "Get the latest news about the latest features and updates",
			value: values.news,
		},
		{
			id: "tips",
			title: "Tips & Tutorials",
			description:
				"Tps and tricks to help Increase our user experience proficiency",
			value: values.tips,
		},
		{
			id: "offers",
			title: "Offer and Promotions",
			description: "Promotions and the latest  offers",
			value: values.offers,
		},
	];
	return (
		<section className="flex flex-col gap-6">
			<p className="font-extrabold  text-3xl">Notification</p>
			<div className=" flex flex-col gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div>
					<p className="font-bold text-base">Email Notification</p>
					<p className=" font-extralight text-sm">
						Abeghelp.me can send you emails and news letters
					</p>
				</div>
				<div className="flex gap-3 items-center">
					<Switch
						id="email"
						checked={values.emailNotification}
						onCheckedChange={() =>
							setValues((prev) => ({
								...prev,
								emailNotification: !values.emailNotification,
							}))
						}
						className=" data-[state=checked]:bg-abeg-primary data-[state=unchecked]:bg-abeg-primary"
					/>
					<p className="font-bold text-base">
						{values.emailNotification ? "On" : "Off"}
					</p>
				</div>
				{checkBoxes.map((item) => {
					return (
						<div className="flex gap-2 items-center">
							<Checkbox
								className="data-[state=checked]:bg-abeg-primary data-[state=checked]:text-zinc-50"
								id={item.id}
								checked={item.value}
								onCheckedChange={() =>
									setValues((prev) => ({ ...prev, [item.id]: !item.value }))
								}
							/>
							<label htmlFor={item.id}>
								<p className="font-bold text-sm">{item.title}</p>
								<p className="font-extralight text-xs">{item.description}</p>
							</label>
						</div>
					);
				})}
				<div className="self-end mt-6 flex gap-2">
					<Button className="text-sm text-abeg-text p-0">Cancel</Button>
					<Button className="text-sm text-abeg-primary p-0">Save</Button>
				</div>
			</div>
		</section>
	);
};
export default Notification;
