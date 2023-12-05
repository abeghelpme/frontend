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
