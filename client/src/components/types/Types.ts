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
  search: SearchState;
};

export type SearchState = {
  currentSearchTerm: string | null;
};

export type ListingPost = {
  _id?: string;
  listName: string;
  description: string;
  address: string;
  price: number;
  sellingPrice: number;
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

export type SearchingForm = {
  search?: string;
  sell?: boolean;
  rent?: boolean;
  offer?: boolean;
  furnished?: boolean;
  parking?: boolean;
  date?: string;
  sort?: string;
};
