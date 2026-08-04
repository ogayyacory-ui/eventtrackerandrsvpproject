import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaPlusCircle } from "react-icons/fa";

function Dashboard() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="section-kicker">Organizer space</p>
          <h1>Make every event count.</h1>
          <p>Manage your campus experiences, RSVPs, and community momentum from one beautiful place.</p>
        </div>
        <Link to="/create-event" className="dashboard-create">Create event <span>+</span></Link>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-title-row"><div><p className="section-kicker">At a glance</p><h2>Your event pulse</h2></div><span>Updated today</span></div>
        <div className="dashboard-stats">
          <StatCard value="12" label="Total events" icon={<FaCalendarAlt />} />
          <StatCard value="235" label="Total RSVPs" icon={<FaUsers />} />
          <StatCard value="3" label="Events this week" icon={<FaPlusCircle />} featured />
        </div>
        <div className="dashboard-title-row dashboard-actions-heading"><div><p className="section-kicker">Keep moving</p><h2>Quick actions</h2></div></div>
        <div className="dashboard-actions">
          <ActionCard to="/create-event" icon="+" title="Create event" description="Publish a new campus experience in minutes." />
          <ActionCard to="/manage-events" icon="✎" title="Manage events" description="Update your event details, schedules, and listings." />
          <ActionCard to="/analytics" icon="↗" title="View analytics" description="Understand attendance and community engagement." />
        </div>
      </section>
    </main>
  );
}

function StatCard({ value, label, icon, featured = false }) {
  return <article className={`dashboard-stat ${featured ? "dashboard-stat-featured" : ""}`}><div><strong>{value}</strong><span>{label}</span></div><i>{icon}</i></article>;
}

function ActionCard({ to, icon, title, description }) {
  return <Link to={to} className="dashboard-action"><span className="dashboard-action-icon">{icon}</span><h3>{title} <b>→</b></h3><p>{description}</p></Link>;
}

export default Dashboard;
