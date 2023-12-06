import {
  type ForgotPasswordProps,
  type LoginProps,
  type ResetPasswordProps,
  type SignUpProps,
} from "@/interfaces/formInputs";
import { zxcvbnAsync, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { z } from "zod";

const options = {
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  useLevenshteinDistance: true,
};
zxcvbnOptions.setOptions(options);

export const checkPasswordStrength = (password: string) =>
  zxcvbnAsync(password).then((response) => response.score);

type FormType = "login" | "signup" | "resetPassword" | "forgotPassword";

const signUpSchema: z.ZodType<SignUpProps> = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name is required" })
      .max(50, { message: "First Name must be less than 50 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last Name is required" })
      .max(50, { message: "Last Name must be less than 50 characters" }),
    email: z
      .string()
      .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Enter a valid email",
      })
      .min(2, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    terms: z.boolean().refine((value) => value === true, {
      message: "Please accept the terms before proceeding",
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      )
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50)
      .refine(
        async (value) => {
          const result = await checkPasswordStrength(value);
          return typeof result === "number" && result < 3 ? false : true;
        },
        {
          message: "Password is too weak!!",
        },
      ),
    confirmPassword: z.string().min(6, { message: "Passwords must match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema: z.ZodType<LoginProps> = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Enter a valid email",
    })
    .min(2, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50),
});

const forgotPasswordSchema: z.ZodType<ForgotPasswordProps> = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Enter a valid email",
    })
    .min(2, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

const resetPasswordSchema: z.ZodType<ResetPasswordProps> = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,!@#$%^&*])[A-Za-z\d.,!@#$%^&*]{6,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      )
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50),
    confirmPassword: z.string().min(6, { message: "Passwords must match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
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
    default:
      return;
  }
};

export type SignUpType = z.infer<typeof signUpSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
