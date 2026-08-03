import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import "./App.css"; // Ensure this import is present for styling
// import "./App.inline.css"; // Removed to use only App.css


function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="app-main">
        <div className="app-container">
          <AppRoutes />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
