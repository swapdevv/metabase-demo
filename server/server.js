import express from "express";
import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/login", (req, res) => {
//   res.json({ message: "Login OK!" });
// });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  res.json({ message: "Login OK!" });
});

app.post("/api/logout", (req, res) => {
  res.json({ message: "Logout OK!" });
});

// Dummy endpoint for Metabase dashboard
app.get("/api/metabase-dashboard", (req, res) => {
  const isLoggedIn = true; // Replace with real authentication check

  if (!isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ iframeUrl: "https://metabase.example.com/dashboard/1" });
});


app.listen(5200, () => console.log("Server running on port 5200"));
