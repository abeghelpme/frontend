import { EditIcon, UploadIcon } from "@/components/common";
import { Button, Input } from "@/components/ui";
import {
	type UpdatePasswordsType,
	type UpdateProfileType,
	cn,
	zodValidator,
} from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

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
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

	// Drag and drop
	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		const file = new FileReader();

		file.onload = function () {
			setPreview(file.result);
		};

		file.readAsDataURL(acceptedFiles[0]);
	}, []);

	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			accept: {
				"image/jpeg": [],
				"image/png": [],
			},
		});

	async function handleOnSubmit(e: React.SyntheticEvent) {
		e.preventDefault();

		if (typeof acceptedFiles[0] === "undefined") return;

		const formData = new FormData();

		formData.append("file", acceptedFiles[0]);

		//await callApi here
	}

	// Form 1
	const {
		register,
		// handleSubmit,
		reset,
		// formState: { errors, isSubmitting },
	} = useForm<UpdateProfileType>({
		resolver: zodResolver(zodValidator("updateProfile")!),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			fullName: "Testing Testing",
			email: "testing@gmail.com",
			phoneNumber: "0192474784",
		},
	});

	//Form 2
	const {
		register: updatePasswordRegister,
		// handleSubmit: updatePasswordHandleSubmit,
		reset: updatePasswordReset,
		// formState: {
		//   errors: updatePasswordError,
		//   isSubmitting: updatePasswordIsSubmitting,
		// },
	} = useForm<UpdatePasswordsType>({
		resolver: zodResolver(zodValidator("updatePasswords")!),
		mode: "onChange",
		reValidateMode: "onChange",
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
			<p className="font-extrabold  text-3xl hidden md:block">Accounts</p>
			<div className=" bg-[#D0D7DE3D] border-2 md:border-0 w-full rounded-lg p-6 flex flex-col gap-3">
				<div className=" flex flex-col md:flex-row gap-4 w-full">
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
					<div
						className={cn(
							"flex-1 cursor-pointer border border-dashed border-abeg-primary bg-white rounded-lg p-4",
							isDragActive && "opacity-60"
						)}
					>
						<div
							{...getRootProps()}
							className=" size-full flex justify-center items-center"
						>
							<input {...getInputProps()} />

							{isDragActive ? (
								<p className="text-sm">Drop the file here ...</p>
							) : (
								<div className="flex flex-col gap-1 justify-center items-center text-center">
									<UploadIcon />
									<p className="text-sm">
										<strong>Click to upload </strong> or drag and drop
									</p>
									<p className="text-sm">
										JPG or PNG (Recommended size 1000px by 1000px)
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
				{preview && (
					<Image
						src={preview as string}
						alt="preview"
						width={200}
						height={200}
						className="size-16 self-center"
					/>
				)}
				<div className="self-end mt-6 flex gap-2">
					<Button
						className="text-sm text-abeg-text p-0"
						onClick={() => setPreview(null)}
					>
						Cancel
					</Button>
					<Button className="text-sm text-abeg-primary p-0">Save</Button>
				</div>
			</div>

			<div className=" flex flex-col md:flex-row gap-4 bg-[#D0D7DE3D] border-2 md:border-0 w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80 border-b-[1px] md:border-b-0 pb-6">
					<p className="font-bold text-sm">Personal Info</p>
					<p className="font-extralight text-xs">
						These are your basic account details, consisting of your name,
						contact, and email address
					</p>
				</div>
				<div className="flex flex-col gap-4  md:border-l-[1px] md:pl-6 flex-1">
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
									fullName: "Testing Testing",
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
			<div className=" flex flex-col md:flex-row gap-4 bg-[#D0D7DE3D] border-2 md:border-0 w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80 border-b-[1px] md:border-b-0 pb-6">
					<p className="font-bold text-sm">Passwords</p>
					<p className="font-extralight text-xs">
						Enter your current password to make updates
					</p>
				</div>
				<div className="flex flex-col gap-8 md:border-l-[1px] md:pl-6 flex-1">
					{updatePassword.map((item: UpdatePassword, id) => {
						return (
							<div key={id} className="flex flex-col gap-3">
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
