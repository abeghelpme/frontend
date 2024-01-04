export type User = {
  twoFA: {
    type: string;
    active: boolean;
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

export type ApiResponse<T = { [key: string]: unknown }> = {
  status: string;
  message: string;
  error?: {
    [key: string]: string[];
  };
  data?: T;
};
