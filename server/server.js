import express from "express";
import cors from "cors";
import teas from "./routes/teas.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/teas", teas);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});