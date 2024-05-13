import {
	type AddAccountDetailsProps,
	type CardDetailsProps,
	type ContactUsProps,
	type ForgotPasswordProps,
	type LoginProps,
	type ResetPasswordProps,
	type SignUpProps,
	type UpdatePasswordsProps,
	type UpdateProfileProps,
} from "@/interfaces";
import { zxcvbn, zxcvbnAsync, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { z } from "zod";

const options = {
	dictionary: {
		...zxcvbnCommonPackage.dictionary,
		...zxcvbnEnPackage.dictionary,
	},
	translations: {
		...zxcvbnEnPackage.translations,
	},
	graphs: zxcvbnCommonPackage.adjacencyGraphs,
	// useLevenshteinDistance: true
};
zxcvbnOptions.setOptions(options);

export const checkPasswordStrength = (password: string) =>
	zxcvbnAsync(password).then((response) => response.score);

type FormType =
	| "login"
	| "signup"
	| "resetPassword"
	| "forgotPassword"
	| "campaignStepOne"
	| "campaignStepTwo"
	| "campaignStepThree"
	| "contactUs"
	| "updateProfile"
	| "updatePasswords"
	| "cardDetails"
	| "addAccountDetails";

const signUpSchema: z.ZodType<SignUpProps> = z
	.object({
		firstName: z
			.string()
			.min(2, { message: "First Name is required" })
			.max(50, { message: "First Name must be less than 50 characters" })
			.transform((value) => {
				return (
					value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
				).trim();
			}),
		lastName: z
			.string()
			.min(2, { message: "Last Name is required" })
			.max(50, { message: "Last Name must be less than 50 characters" })
			.transform((value) => {
				return (
					value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
				).trim();
			}),
		email: z
			.string()
			.min(2, { message: "Email is required" })
			.email({ message: "Invalid email address" })
			.regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
				message: "Enter a valid email",
			})
			.transform((value) => {
				return value.toLowerCase().trim();
			}),
		terms: z.boolean().refine((value) => value === true, {
			message: "Please accept the terms before proceeding",
		}),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			)
			.max(50)
			.transform((value, ctx) => {
				const options = {
					dictionary: {
						...zxcvbnCommonPackage.dictionary,
						...zxcvbnEnPackage.dictionary,
					},
					translations: {
						...zxcvbnEnPackage.translations,
					},
					graphs: zxcvbnCommonPackage.adjacencyGraphs,
					// useLevenshteinDistance: true
				};
				zxcvbnOptions.setOptions(options);
				const testedResult = zxcvbn(value);

				if (testedResult.score < 3) {
					testedResult.feedback.suggestions.map((issue) => {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: issue,
						});
					});
				}

				return value.trim();
			}),
		confirmPassword: z
			.string()
			.min(6, { message: "Password must be more than 6 characters" })
			.transform((value) => {
				return value.trim();
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const loginSchema: z.ZodType<LoginProps> = z.object({
	email: z
		.string()

		.min(2, { message: "Email is required" })
		.regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "Enter a valid email",
		})
		.email({ message: "Invalid email address" })
		.transform((value) => {
			return value.toLowerCase().trim();
		}),
	password: z.string().transform((value) => {
		return value.trim();
	}),
});

const forgotPasswordSchema: z.ZodType<ForgotPasswordProps> = z.object({
	email: z
		.string()
		.min(2, { message: "Email is required" })
		.regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "Enter a valid email",
		})
		.email({ message: "Invalid email address" })
		.transform((value) => {
			return value.toLocaleLowerCase().trim();
		}),
});

const resetPasswordSchema: z.ZodType<ResetPasswordProps> = z
	.object({
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			)
			.max(50)
			.transform((value, ctx) => {
				const options = {
					dictionary: {
						...zxcvbnCommonPackage.dictionary,
						...zxcvbnEnPackage.dictionary,
					},
					translations: {
						...zxcvbnEnPackage.translations,
					},
					graphs: zxcvbnCommonPackage.adjacencyGraphs,
					// useLevenshteinDistance: true
				};
				zxcvbnOptions.setOptions(options);
				const testedResult = zxcvbn(value);

				if (testedResult.score < 3) {
					testedResult.feedback.suggestions.map((issue) => {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: issue,
						});
					});
				}

				return value.trim();
			}),
		confirmPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			)
			.max(50)
			.transform((value) => {
				return value.trim();
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const campaignStepOneSchema = z.object({
	categoryId: z.string().min(1, { message: "Select a category" }),
	country: z.string().min(1, { message: "Select a country" }),
	tags: z.array(z.string()),
});

const campaignStepTwoSchema = z.object({
	title: z.string().min(3, { message: "Title must be at least 3 characters" }),
	fundraiser: z.enum(["INDIVIDUAL", "BENEFICIARY"], {
		errorMap: () => ({ message: "Select the fundraiser's target" }),
	}),
	goal: z.coerce
		.number()
		.min(5000, { message: "Goal must be at least 5,000 Naira" }),
	deadline: z
		.string()
		.min(1, { message: "Choose a deadline for the campaign" }),
});

const campaignStepThreeSchema = z.object({
	photos: z
		.array(
			z.custom<File | string>(
				(file) => file instanceof File || typeof file === "string"
			)
		)
		.min(1, {
			message: "Select at least one image (which would be the cover image)",
		}),
	story: z
		.string()
		.min(100, { message: "Story must be at least 100 characters" }),
	storyHtml: z.string(),
});

const contactUsSchema: z.ZodType<ContactUsProps> = z.object({
	firstName: z
		.string()
		.min(2, { message: "First Name is required" })
		.max(50, { message: "First Name must be less than 50 characters" })
		.transform((value) => {
			return (
				value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
			).trim();
		}),
	lastName: z
		.string()
		.min(2, { message: "Last Name is required" })
		.max(50, { message: "Last Name must be less than 50 characters" })
		.transform((value) => {
			return (
				value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
			).trim();
		}),
	email: z
		.string()
		.min(2, { message: "Email is required" })
		.email({ message: "Invalid email address" })
		.regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "Enter a valid email",
		})
		.transform((value) => {
			return value.toLowerCase().trim();
		}),
	message: z
		.string()
		.min(2, { message: "Message is required" })
		.max(100, { message: "Message must be less than 100 characters" }),
});

const updateProfileSchema: z.ZodType<UpdateProfileProps> = z.object({
	firstName: z
		.string()
		.min(2, { message: "First Name is required" })
		.max(50, { message: "First Name must be less than 50 characters" })
		.transform((value) => {
			return (
				value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
			).trim();
		})
		.optional(),
	lastName: z
		.string()
		.min(2, { message: "Last Name is required" })
		.max(50, { message: "Last Name must be less than 50 characters" })
		.transform((value) => {
			return (
				value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
			).trim();
		})
		.optional(),
	phoneNumber: z.string().optional(),
});

const updatePassWordsSchema: z.ZodType<UpdatePasswordsProps> = z
	.object({
		oldPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			)
			.max(50)
			.transform((value, ctx) => {
				const options = {
					dictionary: {
						...zxcvbnCommonPackage.dictionary,
						...zxcvbnEnPackage.dictionary,
					},
					translations: {
						...zxcvbnEnPackage.translations,
					},
					graphs: zxcvbnCommonPackage.adjacencyGraphs,
				};
				zxcvbnOptions.setOptions(options);
				const testedResult = zxcvbn(value);

				if (testedResult.score < 3) {
					testedResult.feedback.suggestions.map((issue) => {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: issue,
						});
					});
				}

				return value.trim();
			}),
		newPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			)
			.max(50)
			.transform((value, ctx) => {
				const options = {
					dictionary: {
						...zxcvbnCommonPackage.dictionary,
						...zxcvbnEnPackage.dictionary,
					},
					translations: {
						...zxcvbnEnPackage.translations,
					},
					graphs: zxcvbnCommonPackage.adjacencyGraphs,
				};
				zxcvbnOptions.setOptions(options);
				const testedResult = zxcvbn(value);

				if (testedResult.score < 3) {
					testedResult.feedback.suggestions.map((issue) => {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: issue,
						});
					});
				}

				return value.trim();
			}),
		confirmPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters" })
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
				{
					message:
						"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
				}
			)
			.max(50)
			.transform((value) => {
				return value.trim();
			}),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmNewPassword"],
	});

const cardDetailsSchema: z.ZodType<CardDetailsProps> = z.object({
	cardName: z
		.string()
		.min(2, { message: "Card Name is required" })
		.max(50, { message: "Card Name must be less than 50 characters" })
		.transform((value) => {
			return (
				value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
			).trim();
		}),
	cardNumber: z
		.string()
		.min(12, { message: "Card Number is required" })
		.max(18, { message: "Card Number must be less than 18 characters" }),
	cardExpiry: z.string(),
	cvv: z.string(),
});

const addAccountDetailsSchema: z.ZodType<AddAccountDetailsProps> = z.object({
	accountName: z
		.string()
		.min(2, { message: "Card Name is required" })
		.max(50, { message: "Card Name must be less than 50 characters" })
		.transform((value) => {
			return (
				value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
			).trim();
		}),
	accountNumber: z
		.string()
		.min(12, { message: "Card Number is required" })
		.max(18, { message: "Card Number must be less than 18 characters" }),
	bankName: z.string(),
});

export const zodValidator = (formType: FormType) => {
	switch (formType) {
		case "signup":
			return signUpSchema;
		case "login":
			return loginSchema;
		case "forgotPassword":
			return forgotPasswordSchema;
		case "resetPassword":
			return resetPasswordSchema;
		case "campaignStepOne":
			return campaignStepOneSchema;
		case "campaignStepTwo":
			return campaignStepTwoSchema;
		case "campaignStepThree":
			return campaignStepThreeSchema;
		case "contactUs":
			return contactUsSchema;
		case "updateProfile":
			return updateProfileSchema;
		case "updatePasswords":
			return updatePassWordsSchema;
		case "cardDetails":
			return cardDetailsSchema;
		case "addAccountDetails":
			return addAccountDetailsSchema;
		default:
			return;
	}
};

export type SignUpType = z.infer<typeof signUpSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type ContactUsType = z.infer<typeof contactUsSchema>;
export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordsType = z.infer<typeof updatePassWordsSchema>;
export type CardDetailsType = z.infer<typeof cardDetailsSchema>;
export type AddAccountDetailsType = z.infer<typeof addAccountDetailsSchema>;
