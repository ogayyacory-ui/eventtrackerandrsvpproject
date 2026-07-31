import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}

      <section className="bg-primary text-white rounded p-5 mb-5">

        <div className="container">

          <h1 className="display-4 fw-bold">
            Campus Event Tracker & RSVP Portal
          </h1>

          <p className="lead mt-3">
            Discover campus events, RSVP instantly,
            and never miss what's happening around you.
          </p>

          <Link
            to="/events"
            className="btn btn-light btn-lg mt-3"
          >
            Browse Events
          </Link>

        </div>

      </section>

      {/* Features */}

      <section className="mb-5">

        <h2 className="text-center mb-4">
          Why Use This Platform?
        </h2>

        <div className="row">

          <div className="col-md-4">

            <div className="card shadow h-100">

              <div className="card-body text-center">

                <h3>🎉</h3>

                <h5>Discover Events</h5>

                <p>
                  Find academic, sports,
                  entertainment and club events.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow h-100">

              <div className="card-body text-center">

                <h3>✅</h3>

                <h5>Easy RSVP</h5>

                <p>
                  Reserve your seat in one click.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow h-100">

              <div className="card-body text-center">

                <h3>📊</h3>

                <h5>Organizer Dashboard</h5>

                <p>
                  Create and manage events,
                  view attendees and statistics.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}

      <section className="text-center bg-light rounded p-5">

        <h2>Ready to Explore?</h2>

        <p>
          Browse upcoming campus events and RSVP today.
        </p>

        <Link
          to="/events"
          className="btn btn-primary"
        >
          View Events
        </Link>

      </section>
    </>
  );
}

export default Home;