import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

const theme = {
  primary: "#0d6efd",
  bg: "#f4f7fb",
  text: "#111827",
  containerMaxWidth: "1100px",
  cardBg: "#ffffff",
  radius: "10px",
  padding: "24px",
};

function App() {
  // State to track whether the explanation is visible
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: theme.bg,
        color: theme.text,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "28px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: theme.containerMaxWidth,
            margin: "0 auto",
            padding: "0 16px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Main Dynamic Page Content */}
          <AppRoutes />

          {/* Interactive "Why Join This Platform?" Section */}
          <div
            style={{
              marginTop: "40px",
              padding: theme.padding,
              backgroundColor: theme.cardBg,
              borderRadius: theme.radius,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              maxWidth: "650px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "all 0.3s ease",
            }}
          >
            {/* Clickable Header Button */}
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              style={{
                background: "none",
                border: "none",
                color: theme.primary,
                fontSize: "1.25rem",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                outline: "none",
              }}
            >
              Why join this platform? {showExplanation ? "↓" : "→"}
            </button>

            {/* Toggleable Explanation Text */}
            {showExplanation && (
              <p
                style={{
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  color: "#4b5563",
                  marginTop: "16px",
                  marginBottom: 0,
                  maxWidth: "550px",
                }}
              >
                Campus Event Tracker simplifies event discovery and RSVP management.
                Connect with campus activities, manage attendance seamlessly, and
                never miss out on what's happening around you!
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;