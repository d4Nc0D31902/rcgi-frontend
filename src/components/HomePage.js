import React from "react";
import "../Home.css";
import Hero from "./hero/Hero";
import MetaData from "./layout/MetaData";
import Number from "./number/Number";
const HomePage = () => {
  return (
    <div>
      <MetaData title={"Restaurant Concepts Group Inc."} />
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
