import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { json } from "express";
import get from "lodash/get";
import mongoose from "mongoose";

import { DB, PORT } from "./config";
import schema from "./graphql";
import * as AppModels from "./models";
import authRouter from "./apis/auth";
import rateLimiter from "./middlewares/rateLimiter";
import path from "path";

import type { ApolloServer as TApolloServer } from "@apollo/server";

const server: TApolloServer = new ApolloServer({ schema });

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

const startApp = async () => {
  try {
    await mongoose.connect(DB as string);
    console.log("🗄️ Database connected successfully.");

    await server.start();

    app.use(json());
    app.use(cors());
    app.use(rateLimiter);

    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req }) => ({
          token: get(req, "headers.authorization", ""),
          ...AppModels,
        }),
      })
    );

    app.use("/api/user/auth", authRouter);

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "public/index.html"));
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("Unable to start server", err);
  }
};

startApp();
