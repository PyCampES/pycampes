import HeroSection from "../../components/HeroSection/HeroSection";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <main>
        <HeroSection />
        <h1>PyCamp España</h1>
        <p>Página de inicio</p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
