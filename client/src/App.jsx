// client/src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import HomePage from "./pages/HomePage.jsx"; // <-- Import the new HomePage component

function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user ? { token, user: JSON.parse(user) } : null;
  });

  return (
    <Routes>
      {/* Route 1: The main public homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Route 2: The admin login page */}
      {/* If you are NOT logged in, it shows the Login page. */}
      {/* If you ARE logged in, it redirects you to the dashboard. */}
      <Route
        path="/admin"
        element={!auth ? <Login setAuth={setAuth} /> : <Navigate to="/admin/dashboard" />}
      />

      {/* Route 3: The protected admin dashboard */}
      {/* If you ARE logged in, it shows the dashboard. */}
      {/* If you are NOT logged in, it redirects you to the login page. */}
      <Route
        path="/admin/dashboard"
        element={auth ? <AdminDashboard /> : <Navigate to="/admin" />}
      />

      {/* Route 4: A fallback for any other URL */}
      {/* This will redirect any unknown URL back to the homepage. */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;