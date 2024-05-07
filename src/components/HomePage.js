import React from "react";
import "../Home.css";
import Hero from "./hero/Hero";
import Number from "./number/Number";
const HomePage = () => {
  return (
    <div>
      <section id="Hero Section">
        <Hero />
      </section>
      {/*<section id="Number Section">
        <Number />
      </section> */}
      {/* <section>Parallax</section>
      <section>Portfolio1</section>
      <section>Portfolio2</section>
      <section>Portfolio3</section>
      <section>Contact</section> */}
    </div>
  );
};

export default HomePage;
