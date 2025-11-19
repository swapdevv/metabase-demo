import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Local development URL:
// app.use(cors());

// Production URL: Render deployment
app.use(
  cors({
    origin: ["https://react-node-dashboard-e.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());

// Temporary "auth" simulation (pretend login)
let isLoggedIn = false;

app.get("/test-ok", (req, res) => {
  res.json({ message: "Test OK!" });
});

app.post("/api/login", (req, res) => {
  isLoggedIn = true;
  res.json({ message: "Logged in" });
});

app.post("/api/logout", (req, res) => {
  isLoggedIn = false;
  res.json({ message: "Logged out" });
});

// Secure Metabase URL generator
app.get("/api/metabase-dashboard", (req, res) => {
  if (!isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

  const payload = {
    resource: { dashboard: 3 }, // dashboard ID
    params: {},
    exp: Math.round(Date.now() / 1000) + 5 * 60, // 5 minute expiration
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

const PORT = process.env.PORT || 3000; // local fallback

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
