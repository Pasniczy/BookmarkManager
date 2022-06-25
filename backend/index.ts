import express from "express";
import { bookmarksRouter } from "./routes/bookmarks";
import { handleError } from "./utils/errors";

const app = express();

app.use(express.json());

app.use("/bookmarks", bookmarksRouter);

app.use(handleError);

app.listen(5000, "localhost", () => {
  console.log("Server listening on http://localhost:5000");
});
