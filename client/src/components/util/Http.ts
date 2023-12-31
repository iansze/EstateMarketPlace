import { FormValues, GoogleData, ListingPost } from "../types/Types";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const signUp = async (data: FormValues) => {
  try {
    const res = await fetch("/api/auth/signup", {
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
    const res = await fetch("/api/auth/signin", {
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

export const updateUser = async (data: FormValues, id: string) => {
  try {
    const res = await fetch(`/api/user/update/${id}`, {
      method: "PUT",
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
    console.log(
      "🚀 ~ file: http.ts:44 ~ updateUser ~ responseData:",
      responseData,
    );
    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const googleSignIn = async (data: GoogleData) => {
  try {
    const res = await fetch("/api/auth/google-signin", {
      method: "POST",
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
    const res = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log("🚀 ~ file: http.ts:96 ~ deleteUser ~ errorData", errorData);
      throw new Error(errorData.message);
    }
    const responseData = await res.json();
    console.log(
      "🚀 ~ file: http.ts:116 ~ deleteUser ~ responseData:",
      responseData,
    );

    return responseData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signOut = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "GET",
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
    const res = await fetch("/api/listing/create", {
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

export const getListingByUser = async (id: string) => {
  try {
    const res = await fetch(`/api/user/listing/${id}`, {
      method: "GET",
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
    const res = await fetch(`/api/listing/delete/${id}`, {
      method: "DELETE",
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
    const res = await fetch(`/api/listing/update/${id}`, {
      method: "PUT",
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
    const res = await fetch(`/api/listing/list/${id}`, {
      method: "GET",
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
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
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
    const res = await fetch(`/api/listing/get?${search}`, {
      method: "GET",
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
    const res = await fetch(`/api/listing/allListing`, {
      method: "GET",
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
