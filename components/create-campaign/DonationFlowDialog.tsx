import { type DonationDetailsType, cn, zodValidator } from "@/lib";
import { callAbegApi } from "@/lib/helpers/callAbegApi";
import { useSession } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomDialog, FormErrorMessage } from "../common";
import { Button, Checkbox, Input } from "../ui";

function DonationFlowDialog({
	campaignId,
	trigger,
}: {
	campaignId: string;
	trigger: React.ReactNode;
}) {
	const { user } = useSession((state) => state);
	const [donateLoading, setDonateLoading] = useState(false);
	const router = useRouter();

	const [hideMyDetails, setHideMyDetails] = useState(false);

	useEffect(() => {
		if (user) {
			reset({
				donorName: `${user.firstName} ${user.lastName}`,
				donorEmail: user.email,
				amount: "",
			});
		}
	}, [user]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DonationDetailsType>({
		resolver: zodResolver(zodValidator("donationDetails")!),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			donorName: "",
			donorEmail: "",
			amount: "",
		},
	});

	const onDonateSubmit: SubmitHandler<DonationDetailsType> = async (data: DonationDetailsType) => {
		const { data: dataInfo, error } = await callAbegApi<{ paymentUrl?: string }>("/donation/create", {
			...data,
			hideMyDetails,
			campaignId,
			amount: +data.amount,
		});

		if (error) {
			toast.error("Error", {
				description: error.message,
			});
			return;
		}

		toast.success("Success", {
			description: dataInfo.message,
		});

		// redirect to the payment page
		void router.push(dataInfo.data?.paymentUrl!, "_blank");
	};

	return (
		<CustomDialog
			classNames={{
				content: "w-full max-w-[500px] gap-0 p-12 md:p-12",
			}}
			trigger={trigger}
		>
			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => {
					e.preventDefault();
					void handleSubmit(onDonateSubmit)(e);
				}}
			>
				<p className="mt-2 text-center">
					Donate to this campaign. Every penny brings us one step closer to making a difference
				</p>
				<div className="space-y-1 bg-white">
					<label htmlFor="donorName" className="text-sm font-medium md:text-base">
						Full name
					</label>
					<Input
						{...register("donorName")}
						autoFocus
						type="text"
						id="donorName"
						required
						placeholder="Enter your Full name"
						className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
							errors.donorName && "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
						}`}
						disabled={user?.firstName && user.lastName ? true : false}
					/>
					<FormErrorMessage error={errors.donorName!} errorMsg={errors.donorName?.message!} />
					<FormErrorMessage error={errors.donorName} errorMsg={errors.donorName?.message} />
				</div>
				<div className="space-y-1">
					<label htmlFor="donorEmail" className="text-sm font-medium md:text-base">
						Email address
					</label>
					<Input
						{...register("donorEmail")}
						autoFocus
						type="text"
						id="donorEmail"
						required
						placeholder="Enter your email address"
						className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
							errors.donorEmail && "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
						}`}
						disabled={user?.email ? true : false}
					/>
					<FormErrorMessage error={errors.donorEmail!} errorMsg={errors.donorEmail?.message!} />
					<FormErrorMessage error={errors.donorEmail} errorMsg={errors.donorEmail?.message} />
				</div>
				<div className="space-y-1">
					<label htmlFor="amount" className="text-sm font-medium md:text-base">
						Amount
					</label>
					<Input
						{...register("amount")}
						autoFocus
						type="number"
						id="amount"
						required
						placeholder="Enter any amount"
						className={`min-h-[45px] border text-sm font-light disabled:cursor-not-allowed disabled:bg-inherit md:text-base ${
							errors.amount && "ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
						}`}
					/>
					<FormErrorMessage error={errors.amount!} errorMsg={errors.amount?.message!} />
					<FormErrorMessage error={errors.amount} errorMsg={errors.amount?.message} />
				</div>
				<div className="flex items-center gap-3">
					<Checkbox
						name="hideMyDetails"
						id="hideMydetails"
						className="accent-red-500"
						checked={hideMyDetails}
						onCheckedChange={() => setHideMyDetails(!hideMyDetails)}
					/>
					<label
						htmlFor="hideMyDetails"
						className="cursor-pointer text-sm font-medium md:text-base"
						onClick={() => setHideMyDetails(!hideMyDetails)}
					>
						Donate anonymously
					</label>
				</div>
				<Button
					className={cn(
						"bg-abeg-primary text-base text-white",
						donateLoading && "disabled:cursor-not-allowed"
					)}
					loading={donateLoading}
				>
					Donate
				</Button>
			</form>
		</CustomDialog>
	);
}

export default DonationFlowDialog;
