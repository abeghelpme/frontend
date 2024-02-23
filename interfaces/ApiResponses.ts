export type User = {
	twoFA: {
		type: string;
		active: boolean;
		isVerified: boolean;
	};
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	isProfileComplete: boolean;
	isIdVerified: boolean;
	isSuspended: boolean;
	isEmailVerified: boolean;
	isMobileVerified: boolean;
	isTermAndConditionAccepted: boolean;
	createdAt: string;
};

export type ApiResponse<T = Record<string, unknown>> = {
	status: string;
	message: string;
	error?: Record<string, string[]> | string;
	data?: T;
};
