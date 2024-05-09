import { Button, Input } from "@/components/ui";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { zodValidator } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type TableDataType = {
	campaign: string;
	date: string;
	amount: string;
	status: string;
};

const tableData: TableDataType[] = [
	{
		campaign: "Bringing Dental Care to Undeserved Communities",
		date: "Apr 18, 2024",
		amount: "$ 3,000",
		status: "Successful",
	},
	{
		campaign: "Bringing Dental Care to Undeserved Communities",
		date: "Apr 18, 2024",
		amount: "$ 3,000",
		status: "Successful",
	},
	{
		campaign: "Bringing Dental Care to Undeserved Communities",
		date: "Apr 18, 2024",
		amount: "$ 3,000",
		status: "Successful",
	},
	{
		campaign: "Bringing Dental Care to Undeserved Communities",
		date: "Apr 18, 2024",
		amount: "$ 3,000",
		status: "Successful",
	},
];

const Billing = () => {
	//Form 2
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(zodValidator("updateProfile")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	const onSubmit = (data: any) => {
		console.log(data); // Handle form submission here
	};
	return (
		<main className="flex flex-col gap-6">
			<p className="font-extrabold  text-3xl hidden md:block">
				Account and Billing
			</p>
			<section className="gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<h4 className="text-base font-semibold">Card Details</h4>
						<p className="text-sm">Update your billing details and addresses</p>
					</div>
					<Button className="text-sm text-extralight p-2 border border-abeg-text hidden md:block whitespace-nowrap">
						+ Add another card
					</Button>
				</div>
				<div className="flex flex-col mt-5 gap-5 md:pr-24">
					<div className="flex flex-col md:flex-row gap-8 md:pr-20 justify-between text-start w-full">
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								Card Name
							</label>
							<Input
								{...register("cardName")}
								type="text"
								id={"cardName"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								Card Number
							</label>
							<Input
								{...register("cardNumber")}
								type="text"
								id={"cardNumber"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
					</div>
					<div className="flex gap-4 md:gap-8 md:pr-20 justify-between text-start">
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								Expiry
							</label>
							<Input
								{...register("expiry")}
								type="text"
								id={"expiry"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								CVV
							</label>
							<Input
								{...register("cvv")}
								type="text"
								id={"cvv"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
					</div>
					<hr />
					<div className="flex flex-col md:flex-row gap-4 md:gap-8 md:pr-24 justify-between">
						<div className="flex items-center space-x-2 self-start">
							<input
								type="radio"
								value={"app"}
								name="2fa-app"
								checked
								// onChange={() => setSelectedOption("app")}
								id="app"
								className="ml-auto accent-abeg-primary"
							/>
							<div className="flex flex-col">
								<label htmlFor="existing-email" className="text-sm">
									Send to existing email address
								</label>
								<p className="text-xs font-extralight">example@gmail.com</p>
							</div>
						</div>
						<div className="flex items-center space-x-2 self-start">
							<input
								type="radio"
								value={"app"}
								name="2fa-app"
								checked
								// onChange={() => setSelectedOption("app")}
								id="app"
								className="ml-auto accent-abeg-primary"
							/>
							<label htmlFor="another-email" className="text-sm">
								Add another email address
							</label>
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80">
					<p className="font-bold text-base">Billing History</p>
					<p className="font-extralight text-sm">See the donations you made</p>
				</div>
				<Table>
					<TableHeader>
						{/* <TableRow></TableRow> */}
						<TableRow>
							<TableHead>Campaign</TableHead>
							<TableHead className="hidden md:block">Date</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					{tableData.map((item, index) => (
						<TableBody
							key={index}
							className="text-xs font-bold md:font-normal md:text-sm "
						>
							<TableRow>
								<TableCell className="">
									{item.campaign}
									<p className="block md:hidden font-normal">{item.date}</p>
								</TableCell>
								<TableCell className="hidden md:block">{item.date}</TableCell>
								<TableCell className="font-normal">{item.amount}</TableCell>
								<TableCell className="text-center font-normal">
									<p
										className={`border rounded-full p-1 ${
											item.status === "Successful"
												? "border-abeg-primary text-abeg-primary"
												: item.status === "Pending"
												  ? "border-yellow-500 text-yellow-500"
												  : "border-red-500 text-red-500"
										}`}
									>
										{item.status === "Successful"
											? "Successful"
											: item.status === "Pending"
											  ? "Pending"
											  : "Declined"}
									</p>
								</TableCell>
							</TableRow>
						</TableBody>
					))}
				</Table>
			</section>

			<section className="gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="flex flex-col gap-3 md:flex-row justify-between">
					<div className="flex flex-col">
						<h4 className="text-base font-semibold">Account Details</h4>
						<p className="text-sm">Update your billing details and addresses</p>
					</div>
					<Button className="text-sm text-extralight p-2 border border-abeg-text max-w-fit">
						+ Add another account
					</Button>
				</div>
				<div className="flex flex-col mt-5 gap-4 md:gap-5 md:pr-24">
					<div className="flex flex-col md:flex-row gap-4 md:gap-8 md:pr-20 justify-between text-start">
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								Account Name
							</label>
							<Input
								{...register("accountName")}
								type="text"
								id={"accountName"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								Account Number
							</label>
							<Input
								{...register("cardNumber")}
								type="text"
								id={"cardNumber"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-8 text-start md:pr-20">
						<div className="flex-1">
							<label htmlFor="firstName" className="font-semibold text-sm">
								Bank
							</label>
							<Input
								{...register("bank")}
								type="text"
								id={"bank"}
								className={`h-10 font-light text-sm bg-inherit focus:bg-white`}
							/>
						</div>
						<div></div>
					</div>
					<hr />
					<div className="flex flex-col md:flex-row gap-4 md:gap-8 md:pr-24 justify-between">
						<div className="flex items-center space-x-2 self-start">
							<input
								type="radio"
								value={"app"}
								name="2fa-app"
								checked
								// onChange={() => setSelectedOption("app")}
								id="app"
								className="ml-auto accent-abeg-primary"
							/>
							<div className="flex flex-col">
								<label htmlFor="existing-email" className="text-sm">
									Send to existing email address
								</label>
								<p className="text-xs font-extralight">example@gmail.com</p>
							</div>
						</div>
						<div className="flex items-center space-x-2 self-start">
							<input
								type="radio"
								value={"app"}
								name="2fa-app"
								checked
								// onChange={() => setSelectedOption("app")}
								id="app"
								className="ml-auto accent-abeg-primary"
							/>
							<label htmlFor="another-email" className="text-sm">
								Add another email address
							</label>
						</div>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80">
					<p className="font-bold text-base">Payment History</p>
					<p className="font-extralight text-sm">
						See the withdrawals you made
					</p>
				</div>
				<Table>
					<TableHeader>
						{/* <TableRow></TableRow> */}
						<TableRow>
							<TableHead>Campaign</TableHead>
							<TableHead className="hidden md:block">Date</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					{tableData.map((item, index) => (
						<TableBody
							key={index}
							className="text-xs font-bold md:font-normal md:text-sm "
						>
							<TableRow>
								<TableCell className="">
									{item.campaign}
									<p className="block md:hidden font-normal">{item.date}</p>
								</TableCell>
								<TableCell className="hidden md:block">{item.date}</TableCell>
								<TableCell className="font-normal">{item.amount}</TableCell>
								<TableCell className="text-center font-normal">
									<p
										className={`border rounded-full p-1 ${
											item.status === "Successful"
												? "border-abeg-primary text-abeg-primary"
												: item.status === "Pending"
												  ? "border-yellow-500 text-yellow-500"
												  : "border-red-500 text-red-500"
										}`}
									>
										{item.status === "Successful"
											? "Successful"
											: item.status === "Pending"
											  ? "Pending"
											  : "Declined"}
									</p>
								</TableCell>
							</TableRow>
						</TableBody>
					))}
				</Table>
			</section>
		</main>
	);
};
export default Billing;
