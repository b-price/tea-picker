import express from "express";
import cors from "cors";
import teas from "./routes/teas.js";
import vessels from "./routes/vessels.js";
import sessions from "./routes/sessions.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/teas", teas);
app.use("/vessels", vessels);
app.use("/sessions", sessions);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});