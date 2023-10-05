// import { FormValues } from "../../components/types/Types";
// import { QueryClient } from "@tanstack/react-query";

// export const queryClient = new QueryClient();

// export const signUp = async (data: FormValues) => {
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) {
//       const errorData = await res.json();

//       throw new Error(errorData.message);
//     }
//     const responseData = await res.json();
//     return responseData;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// export const signIn = async (data: FormValues) => {
//   try {
//     const res = await fetch("http://localhost:3000/api/auth/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message);
//     }
//     const responseData = await res.json();
//     return responseData;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
