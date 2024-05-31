import { config } from "dotenv";

config();

export const DB = process.env.DB;
export const PORT = process.env.PORT || 5003;
export const BASE_URL = process.env.BASE_URL;
export const APP_SECRET = process.env.APP_SECRET || "SUPER_SECRET_KEY";
export const R_APP_SECRET = process.env.R_APP_SECRET || "SUPER_SECRET_R_KEY";
