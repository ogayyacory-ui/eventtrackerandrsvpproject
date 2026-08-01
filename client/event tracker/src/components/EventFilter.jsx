function EventFilter({ category, setCategory }) {
  return (
    <select
      className="form-select mb-3"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="Academic">Academic</option>
      <option value="Technology">Technology</option>
      <option value="Sports">Sports</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Career">Career</option>
      <option value="Club">Club Activities</option>
    </select>
  );
}

export default EventFilter;