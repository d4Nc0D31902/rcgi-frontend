import React from "react";
import { easeInOut, motion } from "framer-motion";
import "./hero.css";

const Hero = () => {
  return (
    <div className="container">
      <motion.div
        className="overview"
        initial={{ x: "100vw" }}
        animate={{
          x: 0,
          transition: {
            duration: 1.5,
            delay: 0.2,
            // type: "spring",
            ease: easeInOut,
            stiffness: 120,
            damping: 10,
          },
        }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      >
        <h3>Aute est ea fugiat fugiat sit sint ex.</h3>
        <p>
          Magna culpa amet ut veniam enim ipsum adipisicing ullamco proident in
          sint. Aliquip do quis aute aute velit nostrud elit esse excepteur.
          Nisi anim quis sit eiusmod ipsum duis elit magna nostrud in cupidatat
          ad. Proident consectetur culpa commodo ad irure nisi.
        </p>
      </motion.div>
      <div className="rcgi-container">
        <motion.img
          initial={{ x: "-100vw" }}
          animate={{
            x: 0,
            transition: {
              // type: "spring",
              ease: easeInOut,
              stiffness: 120,
              damping: 10,
              duration: 1.5,
            },
          }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          className="rcgi"
          src="./images/rcgi.jpg"
        />
      </div>
      <div className="mustard-box">
        <motion.img
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            duration: 1,
            ease: easeInOut,
            stiffness: 120,
            damping: 10,
          }}
          className="mustard"
          src="./images/mustard.png"
        />
      </div>
    </div>
  );
};

export default Hero;
