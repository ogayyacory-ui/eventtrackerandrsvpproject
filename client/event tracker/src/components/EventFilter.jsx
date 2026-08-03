function EventFilter({ category, setCategory }) {
  return (
    <select
      className="event-filter"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      <option value="academic">Academic</option>
      <option value="technology">Technology</option>
      <option value="sports">Sports</option>
      <option value="entertainment">Entertainment</option>
      <option value="career">Career</option>
      <option value="club">Club Activities</option>
    </select>
  );
}

export default EventFilter;
