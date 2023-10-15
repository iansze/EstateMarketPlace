export type FormValues = {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  photo?: string;
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

export type ListingPost = {
  _id?: string;
  name: string;
  description: string;
  address: string;
  price: number;
  discountedPrice: number;
  baths: number;
  beds: number;
  sell: boolean;
  rent: boolean;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  images: string[];
  userRef: string;
};
