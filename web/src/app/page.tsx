import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Explore from "@/components/Explore";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Floating glassmorphism navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Fullscreen YouTube video background hero section */}
        <Hero />

        {/* Feature Explore section */}
        <Explore />
      </main>

      {/* Minimalist Footer */}
      <Footer />
    </div>
  );
}
