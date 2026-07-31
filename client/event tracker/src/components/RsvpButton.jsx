import { useState } from "react";
import { createRSVP, cancelRSVP } from "../services/rsvpService";

function RSVPButton({ eventId, initialStatus = false }) {
  const [registered, setRegistered] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleRSVP = async () => {
    setLoading(true);

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
      alert("Unable to process RSVP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn ${
        registered ? "btn-danger" : "btn-success"
      }`}
      onClick={handleRSVP}
      disabled={loading}
    >
      {loading
        ? "Please wait..."
        : registered
        ? "Cancel RSVP"
        : "RSVP"}
    </button>
  );
}

export default RSVPButton;