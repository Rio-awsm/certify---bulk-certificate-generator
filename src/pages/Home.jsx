import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <main>
      <Navbar />

      <section>
        <Hero />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
