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
        <h3>RestaurantConcepts Group</h3>
        <p>
          RestaurantConcepts Group, Inc. is a company holding investments in
          food retail, food service and restaurants with the intent of building
          and growing licensed brands to become significant and recognized
          players in their category. It holds a portfolio of brands and
          companies that are distinct, rare and valuable and provides its
          investments focused strategy on all aspects of its organization,
          products, processes and IT. It builds focus in its everyday operations
          for growth and sustainability.
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
