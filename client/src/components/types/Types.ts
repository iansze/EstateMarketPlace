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
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

export type CurrentUserState = {
  currentUser: User;
};

export type RootState = {
  user: CurrentUserState;
};
