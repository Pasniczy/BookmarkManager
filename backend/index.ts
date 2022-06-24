import express from "express";

const app = express();

app.use(express.json());

app.listen(5000, "localhost", () => {
  console.log("Server listening on http://localhost:5000");
});
