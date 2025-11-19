import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow local + production
const allowedOrigins = [
  "http://localhost:5173",
  "https://react-node-dashboard-e.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
    exp: Math.round(Date.now() / 1000) + 5 * 60,
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

const PORT = process.env.PORT || 10000; // Render requires 10000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));