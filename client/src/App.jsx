import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    await fetch("/api/login", { method: "POST" });
    //     await fetch("/api/login", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    // });

    setLoggedIn(true);
  };

  const handleLogout = async () => {
    // await fetch("/api/logout", { method: "POST" });
    await fetch("/api/logout", { method: "POST" });

    setLoggedIn(false);
  };

  // const handleViewAnalytics = async () => {
  //   const res = await fetch("/api/metabase-dashboard");
  //   if (res.status === 401) {
  //     alert("You must be logged in to view analytics.");
  //     return;
  //   }
  //   const { iframeUrl } = await res.json();
  //   window.open(iframeUrl, "_blank");
  // };

  const handleViewAnalytics = async () => {
    const res = await fetch("/api/metabase-dashboard");
    if (res.status === 401) {
      alert("You must be logged in to view analytics.");
      return;
    }
    const { iframeUrl } = await res.json();
    window.open(iframeUrl, "_blank");
  };

return (
  <div style={{ padding: 40, fontFamily: "sans-serif" }}>
    <h1>React Node express Demo</h1>

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
);
}

export default App;
