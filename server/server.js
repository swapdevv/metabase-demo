import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/login", (req, res) => {
//   res.json({ message: "Login OK!" });
// });

const app = express();
app.use(cors());
app.use(express.json());

// Temporary "auth" simulation (pretend login)
let isLoggedIn = false;

app.post("/api/login", (req, res) => {
  isLoggedIn = true;
  res.json({ message: "Login OK!" });
});

app.post("/api/logout", (req, res) => {
  isLoggedIn = false;
  res.json({ message: "Logout OK!" });
});

// Secure Metabase URL generator
app.get("/api/metabase-dashboard", (req, res) => {
  console.log(
    "process.env.METABASE_SECRET_KEY ",
    process.env.METABASE_SECRET_KEY
  );

  if (!isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

  const payload = {
    resource: { dashboard: 3 }, // dashboard ID
    params: {},
    exp: Math.round(Date.now() / 1000) + 1 * 60, // 1 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl =
    METABASE_SITE_URL +
    "/embed/dashboard/" +
    token +
    "#bordered=true&titled=true";

  // "#theme=night&bordered=true&titled=true";

  res.json({ iframeUrl });
});

app.listen(5200, () => console.log("Server running on port 5200"));
