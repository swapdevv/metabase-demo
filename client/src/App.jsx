import { useState } from "react";

const API = import.meta.env.BACKEND_API_URL || "";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    await fetch(`${API}/api/login`, { method: "POST" });
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    // await fetch("/api/logout", { method: "POST" });
    await fetch(`${API}/api/logout`, { method: "POST" });

    setLoggedIn(false);
  };

  const handleViewAnalytics = async () => {
    const res = await fetch(`${API}/api/metabase-dashboard`);
    if (res.status === 401) {
      alert("You must be logged in to view analytics.");
      return;
    }
    const { iframeUrl } = await res.json();
    window.open(iframeUrl, "_blank");
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>React Node express</h1>

      <div style={{ marginTop: 20 }}>
        <p>To redirect to metabase dashboard, you must be logged in.</p>

        {!loggedIn ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
            <button
              style={{ marginLeft: 10 }}
              onClick={handleViewAnalytics}
            >
              View Analytics
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
