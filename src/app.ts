import "express-async-errors";
import express from "express";
import AppError from "@/error/AppError";
import routes from "@/routes";

const app = express();

app.use(express.json());

app.use(routes);

/*@ts-ignore*/
app.use(AppError.errorHandler)

export default app;