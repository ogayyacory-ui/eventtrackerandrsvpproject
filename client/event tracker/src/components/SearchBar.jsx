function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search events..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;