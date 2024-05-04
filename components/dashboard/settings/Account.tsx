import { EditIcon, FormErrorMessage } from "@/components/common";
import DropZoneInput from "@/components/create-campaign/DropZoneInput";
import ImagePreview from "@/components/create-campaign/ImagePreview";
import { Button, Input } from "@/components/ui";
import { type UpdateProfileType, zodValidator } from "@/lib";
import type { UpdatePasswordsType } from "@/lib/validators/validateWithZod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DragAndDrop from "./DragAndDrop";

type UpdateProfileInput = {
	id: "fullName" | "email" | "phoneNumber";
	label: string;
	disabled: boolean;
};

type UpdatePassword = {
	id: "currentPassword" | "newPassword" | "confirmNewPassword";
	label: string;
};

const updatePassword: UpdatePassword[] = [
	{
		id: "currentPassword",
		label: "Current Password",
	},
	{
		id: "newPassword",
		label: "New Password",
	},
	{
		id: "confirmNewPassword",
		label: "Confirm New Password",
	},
];

const Account = () => {
	const [inputs, setInputs] = useState<UpdateProfileInput[]>([
		{ id: "fullName", label: "Full Name", disabled: true },
		{ id: "email", label: "E-mail", disabled: true },
		{ id: "phoneNumber", label: "Phone Number", disabled: true },
	]);

	// Form 1
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<UpdateProfileType>({
		resolver: zodResolver(zodValidator("updateProfile")!),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			fullName: "jadkjf kajdkfj akjd kldaf ",
			email: "testing@gmail.com",
			phoneNumber: "0192474784",
		},
	});

	//Form 2
	const {
		register: updatePasswordRegister,
		handleSubmit: updatePasswordHandleSubmit,
		reset: updatePasswordReset,
		formState: {
			errors: updatePasswordError,
			isSubmitting: updatePasswordIsSubmitting,
		},
	} = useForm<UpdatePasswordsType>({
		resolver: zodResolver(zodValidator("updateProfile")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	//Form 3
	const {
		control,
		handleSubmit: uploadProfileImage,
		formState,
		getValues,
		reset: uploadProfileImageReset,
		setValue: setFormValue,
	} = useForm({
		mode: "onChange",
		resolver: zodResolver(zodValidator("campaignStepThree")!),
	});

	const toggleDisabled = (index: number) => {
		setInputs(
			inputs.map((input, i) => {
				if (i === index) {
					return { ...input, disabled: !input.disabled };
				}
				return input;
			})
		);
	};

	return (
		<section className="flex flex-col gap-6">
			<p className="font-extrabold  text-3xl">Accounts</p>
			<div className=" flex gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="flex flex-col gap-4 ">
					<p className="font-bold text-base">Profile Photo</p>
					<Image
						src="/assets/images/about-page/jane.png"
						alt="profile image"
						width={200}
						height={200}
						className=" size-32 object-cover rounded-full"
					/>
				</div>
				<div className="flex-1 ">
					<Controller
						control={control}
						name="photos"
						render={({ field }) => (
							<>
								<DragAndDrop value={field.value} onChange={field.onChange} />
								{/* <DragAndDropImagePreview
                  // file={field.value}
                  value={field.value}
                  onChange={field.onChange}
                /> */}
								{/* <Image src={field.value} alt='image' width={200} height={200} /> */}
							</>
						)}
					/>
				</div>
			</div>
			<div className=" flex gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80">
					<p className="font-bold text-sm">Personal Info</p>
					<p className="font-extralight text-xs">
						These are your basic account details, consisting of your name,
						contact, and email address
					</p>
				</div>
				<div className="flex flex-col gap-4 border-l-[1px] pl-6 flex-1">
					{inputs.map((input: UpdateProfileInput, id) => {
						return (
							<div
								key={input.id}
								className="flex justify-between items-center gap-6"
							>
								<div className="flex-1">
									<label htmlFor="firstName" className="font-bold text-sm">
										{input.label}
									</label>
									<Input
										{...register(input.id)}
										type="text"
										id={input.id}
										className={` h-10 font-light text-sm disabled:border-0 disabled:bg-inherit disabled:p-0`}
										disabled={input.disabled}
									/>
								</div>
								<div
									className="hover:cursor-pointer text-xs text-abeg-primary self-end"
									onClick={() => toggleDisabled(id)}
								>
									{input.disabled ? <EditIcon /> : "Ok"}
								</div>
							</div>
						);
					})}
					<div className="self-end mt-6 flex gap-2">
						<Button
							className="text-sm text-abeg-text p-0"
							onClick={() =>
								reset({
									fullName: "jadkjf kajdkfj akjd kldaf ",
									email: "testing@gmail.com",
									phoneNumber: "0192474784",
								})
							}
						>
							Cancel
						</Button>
						<Button className="text-sm text-abeg-primary p-0">Save</Button>
					</div>
				</div>
			</div>
			<div className=" flex gap-4 bg-[#D0D7DE3D] w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80">
					<p className="font-bold text-sm">Passwords</p>
					<p className="font-extralight text-xs">
						Enter your current password to make updates
					</p>
				</div>
				<div className="flex flex-col gap-8 border-l-[1px] pl-6 flex-1">
					{updatePassword.map((item: UpdatePassword, id) => {
						return (
							<div className="flex flex-col gap-3">
								<label htmlFor="firstName" className="font-bold text-sm">
									{item.label}
								</label>
								<Input
									{...updatePasswordRegister(item.id)}
									type="password"
									id={item.id}
									className={` h-10 font-light text-sm bg-inherit focus:bg-white`}
								/>
							</div>
						);
					})}
					<div className="self-end mt-6 flex gap-2">
						<Button
							className="text-sm text-abeg-text p-0"
							onClick={() =>
								updatePasswordReset({
									confirmNewPassword: "",
									currentPassword: "",
									newPassword: "",
								})
							}
						>
							Cancel
						</Button>
						<Button className="text-sm text-abeg-primary p-0">Save</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Account;
