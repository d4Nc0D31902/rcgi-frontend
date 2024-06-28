import React from "react";
import "../Home.css";
import Hero from "./hero/Hero";
import MetaData from "./layout/MetaData";
import SecondPage from "./hero/SecondPage";
import ThirdPage from "./hero/ThirdPage";
const HomePage = () => {
  return (
    <div>
      <MetaData title={"Home"} />
      <section id="Hero Section">
        <Hero />
      </section>
      <section id="Second Section">
        <SecondPage />
      </section>
      <section id="Third Section">
        <ThirdPage />
      </section>
    </div>
  );
};

export default HomePage;
