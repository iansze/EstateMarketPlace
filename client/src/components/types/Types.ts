export type FormValues = {
  username?: string;
  password: string;
  email: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  photo?: string;
};

export type SignInResponseData = {
  message: string;
  user: User;
};

export type GoogleData = {
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  };
};

export type CurrentUserState = {
  user: CurrentUser;
};

export type CurrentUser = {
  currentUser: SignInResponseData;
};
