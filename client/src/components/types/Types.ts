export type FormValues = {
  username?: string;
  password: string;
  email: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
};

export type SignInResponseData = {
  message: string;
  user: User;
};
