const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRouter = require("./Routes/todo");
const authRouter = require("./Routes/auth");
const { connectDB } = require("./Config/db");
require("dotenv").config();

connectDB();

const app = express();

app.use(cors());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send({ mgs: "Server is ready to use" });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to Server on ${process.env.PORT}`);
});
