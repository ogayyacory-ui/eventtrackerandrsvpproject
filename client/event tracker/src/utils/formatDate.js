export default function formatDate(isoString) {
  if (!isoString) return "-";
  try {
    const dt = new Date(isoString);
    if (Number.isNaN(dt.getTime())) return "-";
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(dt);
  } catch (e) {
    return isoString;
  }
}
