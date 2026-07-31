import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <main className="container mt-4">
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;