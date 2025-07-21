import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import LoginPrompt from "./Components/LoginPrompt";
import About from "./Routes/About";
import NotFound from "./Routes/NotFound";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // If the user previously logged in, the token should be in sessionStorage
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <>
      <nav className="sidebar glass-panel">
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
      <div className="content">
        {/* Header that will remain persistent regardless of page */}
        <header>
          <h1>
            <span className="accent">Rhythm</span> <span>Radar</span>
          </h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              accessToken ? (
                <Dashboard accessToken={accessToken} />
              ) : (
                <LoginPrompt setAccessToken={setAccessToken} />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
