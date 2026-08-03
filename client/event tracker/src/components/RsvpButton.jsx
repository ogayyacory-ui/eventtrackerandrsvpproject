import { useState } from "react";
import { createRSVP, cancelRSVP } from "../services/rsvpService";

function RSVPButton({ eventId, initialStatus = false }) {
  const [registered, setRegistered] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRSVP = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      if (registered) {
        await cancelRSVP(eventId);
        setRegistered(false);
      } else {
        await createRSVP(eventId);
        setRegistered(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Unable to process RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`rsvp-btn ${
          registered ? "rsvp-cancel" : "rsvp-register"
        }`}
        onClick={handleRSVP}
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : registered
          ? "Cancel RSVP"
          : "RSVP Now"}
      </button>
      {errorMessage && (
        <p role="alert" style={{ color: "#b91c1c", marginTop: "12px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default RSVPButton;
