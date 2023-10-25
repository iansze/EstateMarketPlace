/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      btnStle: {
        btnStle:
          "rounded-lg bg-[#5ca1e1] border-none text-white text-center text-2xl px-16 py-4 w-56 transition-all duration-500 ease-in-out cursor-pointer m-9 shadow-lg after:content-['»'] after:absolute after:top-[14px] after:right-[20px]",
      },
    },
  },
  plugins: [],
};
