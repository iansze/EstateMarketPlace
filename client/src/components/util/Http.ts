import { FormValues, GoogleData, ListingPost } from "../types/Types";
import { QueryClient } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const queryClient = new QueryClient();

export const signUp = async (data: FormValues) => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signIn = async (data: FormValues) => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUser = async (data: FormValues, id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/update/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();

    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const googleSignIn = async (data: GoogleData) => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/google-signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.displayName,
        email: data.email,
        photo: data.photoURL,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    if (!data.displayName || !data.email || !data.photoURL) {
      throw new Error("Incomplete user data.");
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("🚀 ~ file: http.ts:96 ~ deleteUser ~ errorData", errorData);
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createListing = async (data: ListingPost) => {
  try {
    const res = await fetch(`${baseUrl}/api/listing/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getListingByUser = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/listing/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteListing = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/listing/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateListing = async (data: ListingPost, id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/listing/update/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getListingById = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/listing/list/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUser = async (id: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearch = async (search: string) => {
  try {
    const res = await fetch(`${baseUrl}/api/listing/get?${search}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllListings = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/listing/allListing`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
