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

export type UpdateProfileProps = {
	firstName?: string;
	lastName?: string;
	// email?: string;
	phoneNumber?: string;
};

export type UpdatePasswordsProps = {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export type CardDetailsProps = {
	cardNumber: string;
	cvv: string;
	cardName: string;
	cardExpiry: string;
};

export type AddAccountDetailsProps = {
	accountName: string;
	accountNumber: string;
	bankName: string;
};

export type DonationDetailsProps = {
	donorEmail: string;
	donorName: string;
	amount: number;
};
