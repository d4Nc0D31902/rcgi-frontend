import React from "react";
import { easeInOut, motion } from "framer-motion";
import MetaData from "../layout/MetaData";
import "./Barcino/Barcino.css";
import "./Barcino/BarcinoJS.js";

const Barcino = () => {
  return (
    <div className="header">
      <MetaData title={"Barcino"} />

      <div className="inner-header flex">
        <img
          src="/images/barcinologo3d.gif"
          alt="Barcino Logo 3d"
          style={{ width: "120px", height: "125px" }}
        />
      </div>
      <div>
        <img
          src="/images/barcinologo.png"
          alt="Barcino Logo"
          style={{ width: "280px", height: "180px", marginTop: "-400px" }}
        />
      </div>
      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
          dangerouslySetInnerHTML={{
            __html: `
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(190, 100, 102, 0.55)"/>
              <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(177, 72, 74, 0.86)"/>
              <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(115, 28, 29, 0.78)" />
              <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(73, 6, 7, 1)" />
            </g>
          `,
          }}
        />
      </div>
      <div className="secondp">
        <div className="containerbarcino">
          <div className="row">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="column"
            >
              <div className="content">
                &nbsp; &nbsp; &nbsp;
                <h2 style={{ fontSize: "75px" }}>𝔈𝔵𝔭𝔢𝔯𝔦𝔢𝔫𝔠𝔢 𝔖𝔭𝔞𝔦𝔫 𝔈𝔳𝔢𝔯𝔶𝔡𝔞𝔶</h2>
              </div>
            </motion.div>
            <motion.div
              className="column"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="content">
                <h2></h2>
                <p>
                  Barcino celebrates the beauty and diversity of Spanish cuisine
                  and gives tribute to the Spanish wine culture. Immerse
                  yourself in the allure of Spain and enjoy dining the Spanish
                  way
                </p>
              </div>
            </motion.div>
          </div>
          <div className="row">
            <div className="column">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="content"
              >
                <h2 style={{ fontSize: "50px" }}>𝔖𝔞𝔫𝔤𝔯𝔦𝔞</h2>
                <h3>- The best in metro -</h3>
                <p>
                  Home of the rightfully well-loved sangria in the metro. Our
                  sangria is not for the faint of heart - the bright flavors,
                  deep colors and refreshing chill - each glass is crafted
                  perfectly.{" "}
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="column"
            >
              <div className="content">
                <img src="/images/sangriabottles.png" alt="Image 2" />
              </div>
            </motion.div>
          </div>
          <div className="row">
            <motion.div
              className="column"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="content">
                <img src="/images/winebottles.png" alt="Image 3" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="column"
            >
              <div className="content">
                <h2 style={{ fontSize: "50px" }}>𝔴𝔦𝔫𝔢</h2>
                <h3>- A Tribute to Wine Culture -</h3>
                <p>
                  Our vast collection offers one an insight to wine’s wealth of
                  scents, tastes and colors giving one’s palette the
                  extraordinary pleasure that is wine - expertly stocked from
                  multi-awarded wineries of Beronia, Vallformosa and Matarromera
                  among others. The care taken in wine production of these
                  partner vineyards and the result of an age-old tradition, in
                  addition to the high quality of vines, have made Spanish wine
                  an acclaimed treasure.{" "}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Barcino;
