import { useState } from "react";

const API = import.meta.env.BACKEND_API_URL || "";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    await fetch(`${API}/api/login`, { method: "POST" });
    setLoggedIn(true);
  };

  const handleLogout = async () => {
    await fetch(`${API}/api/logout`, { method: "POST" });
    setLoggedIn(false);
  };

  const handleViewAnalytics = async (dashboardId) => {
    const res = await fetch(`${API}/api/metabase-dashboard/${dashboardId}`);
    if (res.status === 401) {
      alert("You must be logged in to view analytics.");
      return;
    }
    const { iframeUrl } = await res.json();
    window.open(iframeUrl, "_blank");
  };

  // Component for Analytics Buttons
  const AnalyticsButton = () => {
    if (!loggedIn) return null;

    return (
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "left", paddingTop: 20 }}>
        <div>
          <button id="btn-content-management" onClick={() => handleViewAnalytics(4)}>
            Content Management</button>
          <button
            id="btn-plausible-analytics"
            style={{ marginLeft: 10 }}
            onClick={() => handleViewAnalytics(3)}
          >
            View Plausible Analytics
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>React Node express</h1>

      <div id='dashboard-container' style={{ marginTop: 20, height: '100%' }}>
        <p>To redirect to metabase dashboard, you must be logged in.</p>

        {!loggedIn ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <>
            <div>
              <AnalyticsButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
