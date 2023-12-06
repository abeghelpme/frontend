import { type LoginProps, type SignUpProps } from "@/lib/typesAndInterfaces";
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

type FormType = "login" | "signup";
export const zodValidator = (formType: FormType) => {
  if (formType === "signup") {
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

    return signUpSchema;
  } else if (formType === "login") {
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
    return loginSchema;
  }
};

export const signupSchema = zodValidator("signup") as z.ZodType<SignUpProps>;
export const loginSchema = zodValidator("login") as z.ZodType<LoginProps>;
export type SignUpType = z.infer<typeof signupSchema>;
export type LoginType = z.infer<typeof loginSchema>;
