import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CertificateGenerate from "../components/CertificateGenerate";

const Generate = () => {
  return (
    <main>
      <Navbar />
      <section>
        <CertificateGenerate />
      </section>
      <Footer />
    </main>
  );
};

export default Generate;
