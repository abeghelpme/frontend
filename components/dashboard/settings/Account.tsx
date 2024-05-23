import { EditIcon, FormErrorMessage, UploadIcon } from "@/components/common";
import { Button, Input } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import {
	type UpdatePasswordsType,
	type UpdateProfileType,
	callApi,
	cn,
	zodValidator,
} from "@/lib";
import { useSession } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type UpdateProfileInput = {
	id: "firstName" | "lastName" | "phoneNumber";
	label: string;
	disabled: boolean;
};

type UpdatePassword = {
	id: "oldPassword" | "newPassword" | "confirmPassword";
	label: string;
};

const updatePassword: UpdatePassword[] = [
	{
		id: "oldPassword",
		label: "Current Password",
	},
	{
		id: "newPassword",
		label: "New Password",
	},
	{
		id: "confirmPassword",
		label: "Confirm New Password",
	},
];

const Account = () => {
	const { user } = useSession((state) => state);
	const { updateUser } = useSession((state) => state.actions);
	const [userPhoto, setUserPhoto] = useState("");
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
	const [inputs, setInputs] = useState<UpdateProfileInput[]>([
		{ id: "firstName", label: "First Name", disabled: true },
		{ id: "lastName", label: "Last Name", disabled: true },
		{ id: "phoneNumber", label: "Phone Number", disabled: true },
	]);

	useEffect(() => {
		if (user) {
			reset({
				firstName: user.firstName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber,
			});
			setUserPhoto(user.photo);
		}
	}, [user]);

	// Drag and drop image
	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		const file = new FileReader();
		file.onload = function () {
			setPreview(file.result);
		};
		file.readAsDataURL(acceptedFiles[0]);
		toast.success("Success", { description: "1 file chosen successfully" });
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

	const handleUploadProfileImage = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (typeof acceptedFiles[0] === "undefined") {
			toast.error("Error", { description: "You must add one image" });
			return;
		}

		const formData = new FormData();

		formData.append("photo", acceptedFiles[0]);

		// await callApi here /user/profile-photo
		const { data, error } = await callApi<ApiResponse>(
			"/user/profile-photo",
			formData
		);
		if (error) {
			toast.error("Error", { description: error.message });
			return;
		}
		toast.success("Success", {
			description:
				(data?.data?.message as string) ||
				"Profile image uploaded successfully",
		});
		setUserPhoto(data?.data?.photo as string);
		setPreview(null);
	};

	// Form 1
	const { register, handleSubmit, reset } = useForm<UpdateProfileType>({
		resolver: zodResolver(zodValidator("updateProfile")!),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			phoneNumber: user?.phoneNumber,
		},
	});
	// Submit handler for form 1
	const onUpdateProfileSubmit: SubmitHandler<UpdateProfileType> = async (
		data: UpdateProfileType
	) => {
		const remove234 = (value: string) =>
			value.startsWith("234") ? value.substring(3) : value;
		const { data: dataInfo, error } = await callApi<ApiResponse>(
			"/user/update-profile",
			{ ...data, phoneNumber: `234${remove234(data.phoneNumber as string)}` }
		);
		if (error) {
			toast.error("Error", {
				description: error.message,
			});
			return;
		}
		toast.success("Success", {
			description: dataInfo?.message,
		});
		// updateUser(dataInfo)
	};

	//Form 2
	const {
		register: updatePasswordRegister,
		handleSubmit: updatePasswordHandleSubmit,
		reset: updatePasswordReset,
		formState: { errors: updatePasswordError },
	} = useForm<UpdatePasswordsType>({
		resolver: zodResolver(zodValidator("updatePasswords")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	const onUpdatePasswordHandleSubmit: SubmitHandler<UpdatePasswordsType> =
		async (data: UpdatePasswordsType) => {
			const { data: dataInfo, error } = await callApi<ApiResponse>(
				"/user/change-password",
				data
			);
			if (error) {
				toast.error("Error", {
					description:
						error.message || "There was an error updating your passwords",
				});
				return;
			}
			toast.success("Success", {
				description: dataInfo?.message || "Passwords updated Successfully",
			});
			updatePasswordReset({
				confirmPassword: "",
				newPassword: "",
				oldPassword: "",
			});
		};

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
			<form
				onSubmit={handleUploadProfileImage}
				className=" bg-[#D0D7DE3D] border-2 md:border-0 w-full rounded-lg p-6 flex flex-col gap-3"
			>
				<div className=" flex flex-col md:flex-row gap-4 w-full">
					<div className="flex flex-col gap-4 ">
						<p className="font-bold text-base">Profile Photo</p>
						<Image
							src={userPhoto || "/assets/images/dashboard/userIcon.svg"}
							alt="profile image"
							width={200}
							height={200}
							className="size-20 md:size-32 object-cover rounded-full"
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
					<Button className="text-sm text-abeg-primary p-0" type="submit">
						Save
					</Button>
				</div>
			</form>

			<div className=" flex flex-col md:flex-row gap-4 bg-[#D0D7DE3D] border-2 md:border-0 w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80 border-b-[1px] md:border-b-0 pb-6">
					<p className="font-bold text-sm">Personal Info</p>
					<p className="font-extralight text-xs">
						These are your basic account details, consisting of your name,
						contact, and email address
					</p>
				</div>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						void handleSubmit(onUpdateProfileSubmit)(event);
					}}
					className="flex flex-col gap-4  md:border-l-[1px] md:pl-6 flex-1"
				>
					{inputs.map((input: UpdateProfileInput, id) => {
						return (
							<div
								key={input.id}
								className="flex justify-between items-center gap-6"
							>
								<div className="flex-1">
									<label htmlFor={input.id} className="font-bold text-sm">
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
							onClick={() => {
								reset({
									firstName: user?.firstName,
									lastName: user?.lastName,
									// email: user.email,
									phoneNumber: user?.phoneNumber,
								});

								setInputs(
									inputs.map((input) => ({ ...input, disabled: true }))
								);
							}}
						>
							Cancel
						</Button>
						<Button className="text-sm text-abeg-primary p-0" type="submit">
							Save
						</Button>
					</div>
				</form>
			</div>
			<div className=" flex flex-col md:flex-row gap-4 bg-[#D0D7DE3D] border-2 md:border-0 w-full rounded-lg p-6">
				<div className="md:w-64 xl:w-80 border-b-[1px] md:border-b-0 pb-6">
					<p className="font-bold text-sm">Passwords</p>
					<p className="font-extralight text-xs">
						Enter your current password to make updates
					</p>
				</div>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						void updatePasswordHandleSubmit(onUpdatePasswordHandleSubmit)(
							event
						);
					}}
					className="flex flex-col gap-8 md:border-l-[1px] md:pl-6 flex-1"
				>
					{updatePassword.map((item: UpdatePassword, id) => {
						return (
							<div key={id} className="flex flex-col gap-3">
								<label htmlFor={item.id} className="font-bold text-sm">
									{item.label}
								</label>
								<Input
									{...updatePasswordRegister(item.id)}
									type="password"
									id={item.id}
									className={`h-10 font-light text-sm bg-inherit focus:bg-white ${
										updatePasswordError[item.id] &&
										"ring-2 ring-abeg-error-20 placeholder:text-abeg-error-20"
									}`}
								/>
								<FormErrorMessage
									error={updatePasswordError[item.id]!}
									errorMsg={updatePasswordError[item.id]?.message!}
								/>
							</div>
						);
					})}
					<div className="self-end mt-6 flex gap-2">
						<Button
							className="text-sm text-abeg-text p-0"
							onClick={() =>
								updatePasswordReset({
									confirmPassword: "",
									oldPassword: "",
									newPassword: "",
								})
							}
						>
							Cancel
						</Button>
						<Button className="text-sm text-abeg-primary p-0" type="submit">
							Save
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
};
export default Account;
