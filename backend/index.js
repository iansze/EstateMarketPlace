import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 3000;
const corsOrigin = process.env.CORS_ORIGIN;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ", err);
  });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X_Requested-With, Content-Type, Accept, Authorization,X-Api-Key"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");

//   next();
// });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(path.resolve(), "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../client/dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
