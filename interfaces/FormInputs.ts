export type SignUpProps = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	terms: boolean;
};

export type LoginProps = {
	email: string;
	password: string;
};

export type ResetPasswordProps = {
	password: string;
	confirmPassword: string;
};

export type ForgotPasswordProps = {
	email: string;
};

export type ContactUsProps = {
	firstName: string;
	lastName: string;
	email: string;
	message: string;
};
