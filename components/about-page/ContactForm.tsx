import { FormErrorMessage } from "@/components/common";
import { Button, Input } from "@/components/ui";
import type { ApiResponse } from "@/interfaces";
import { type ContactUsType, callApi, zodValidator } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactForm = () => {
	const [message, setMessage] = useState<ApiResponse>({
		status: "",
		message: "",
		error: undefined,
		data: undefined,
	});
	const [isChecked, setIsChecked] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactUsType>({
		resolver: zodResolver(zodValidator("contactUs")!),
		mode: "onChange",
		reValidateMode: "onChange",
	});

	const onSubmit: SubmitHandler<ContactUsType> = async (
		data: ContactUsType
	) => {
		// const { data: responseData, error } = await callApi<ApiResponse>(
		//   "/contact-us",
		//   {
		//     email: data.email,
		//     firstName: data.firstName,
		//     lastName: data.lastName,
		//     phone: data.phone,
		//     message: data.message,
		//     isTermAndConditionAccepted: data.terms,
		//   }
		// );
		// if (error) {
		//   const castedError = error as ApiResponse;
		//   setMessage(castedError);
		//   toast.error(castedError.status, {
		//     description: castedError.message,
		//     duration: 2000,
		//   });
		//   return;
		// } else {
		//   toast.success("Success", {
		//     description: responseData?.message,
		//     duration: 2000,
		//   });
		//   reset();
		// }
	};
	return (
		<section className="px-5 md:px-20 flex flex-col items-center space-y-10">
			<div className="flex flex-col items-center space-y-5">
				<h1 className="font-bold text-4xl lg:text-6xl">Get in touch</h1>
				<p className="text-base lg:text-2xl font-extralight">
					We’d love to hear from you, kindly fill out this form.
				</p>
			</div>
			<div className="flex items-center justify-center w-full md:w-[50%] md:max-w-[52.9rem]">
				<form
					onSubmit={(event) => {
						event.preventDefault();
						void handleSubmit(onSubmit)(event);
					}}
					action=""
					className="w-full flex flex-col gap-4 lg:gap-6"
				>
					{message.message !== "" && !message.error ? (
						<p
							className={`rounded-md bg-abeg-error-40 p-4 text-sm font-medium text-abeg-error-20`}
						>
							{message.message}
						</p>
					) : (
						message.error &&
						typeof message.error === "object" && (
							<ul className="list-inside list-disc space-y-1 rounded-md bg-abeg-error-40 p-4 text-xs font-medium text-abeg-error-20">
								{Object.keys(message.error).length > 0 &&
									Object.keys(message.error).map((key) => (
										<li key={key} className={``}>
											{(message.error as { [key: string]: string[] })[key]}
										</li>
									))}
							</ul>
						)
					)}
					<div className="grid grid-cols-2 gap-4 lg:gap-6">
						<div className="space-y-1">
							<label htmlFor="firstName" className="font-medium lg:text-lg">
								First Name
							</label>
							<Input
								{...register("firstName")}
								type="text"
								id="firstName"
								className={`min-h-[45px]`}
								errorField={errors.firstName}
							/>
							<FormErrorMessage
								errorMsg={errors.firstName?.message!}
								error={errors.firstName!}
							/>
						</div>
						<div className="space-y-1">
							<label htmlFor="lastName" className="font-medium lg:text-lg">
								Last Name
							</label>
							<Input
								{...register("lastName")}
								type="text"
								id="lastName"
								className={`min-h-[45px]`}
								errorField={errors.lastName}
							/>
							<FormErrorMessage
								errorMsg={errors.lastName?.message!}
								error={errors.lastName!}
							/>
						</div>
					</div>

					<div className="space-y-1">
						<label htmlFor="email" className="font-medium lg:text-lg">
							Email
						</label>
						<Input
							type="email"
							id="email"
							className={`min-h-[45px]`}
							{...register("email")}
							errorField={errors.email}
						/>
						<FormErrorMessage
							errorMsg={errors.email?.message!}
							error={errors.email!}
						/>
					</div>

					<div className="space-y-1 sm:space-y-0 lg:gap-6">
						<label htmlFor="password" className="mb-1 font-medium lg:text-lg">
							Phone number
						</label>
						<Input
							type="phone"
							{...register("phone")}
							id="phone"
							className={`min-h-[45px]`}
							errorField={errors.phone}
						/>
						<FormErrorMessage
							errorMsg={errors.phone?.message!}
							error={errors.phone!}
						/>
					</div>
					<div className="space-y-1 sm:space-y-0 lg:gap-6">
						<label htmlFor="message" className="mb-1 font-medium lg:text-lg">
							Message
						</label>
						<Input
							type="text"
							{...register("message")}
							id="message"
							className={`min-h-[95px]`}
							errorField={errors.message}
						/>
						<FormErrorMessage
							errorMsg={errors.message?.message!}
							error={errors.message!}
						/>
					</div>

					<div className="flex flex-col items-center space-y-6 text-sm md:text-base">
						<Button
							disabled={isSubmitting}
							className=""
							variant="primary"
							fullWidth
							loading={isSubmitting}
						>
							Send Message
						</Button>
					</div>
				</form>
			</div>
		</section>
	);
};
export default ContactForm;
