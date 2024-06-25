import React, { useRef } from "react";
import anime from "animejs"; // Import anime.js library
import "./Bluesmith.css";
import { TextareaAutosize } from "@mui/material";

const Bluesmith = () => {
  // Initialize an array of refs for each card
  const cardRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Array to track playing state for each card
  const playing = [false, false, false, false, false, false];

  const handleClick = (index) => {
    if (playing[index]) return;

    playing[index] = true;
    anime({
      targets: cardRefs[index].current,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 450,
      complete: function (anim) {
        playing[index] = false;
        // Adjust text size after animation completes
        adjustTextSize(index);
      },
    });
  };

  const adjustTextSize = (index) => {
    const cardElement = cardRefs[index].current;
    const cardWidth = cardElement.offsetWidth;
    const cardHeight = cardElement.offsetHeight;
    const textElement = cardElement.querySelector(".back");

    // Calculate desired font size relative to card size
    const fontSize = Math.min(cardWidth / 30, cardHeight / 1); // Adjust these values as needed

    // Apply the font size to the text element
    textElement.style.fontSize = `${fontSize}px`;
  };

  // Define your content for each card here
  const cards = [
    {
      image: "/images/BS4.png",
      text: "Here at Bluesmith, comfort is our makers mark - our signature. Every cup of coffee and every dish we create has that touch of familiar comfort. While we may have added a few artistic flourishes here and there, everything we craft is always grounded on the flavors and aromas that provide nothing but warm, comforting goodness time and time again.",
    },
    { image: "/images/BS2.png", text: "COMFORT FOOD AT ITS BEST" },
    {
      image: "/images/BS5.png",
      text: "All-day, from sunrise to sundown, our food provides a nostalgic and sentimental feeling of comfort and prepared using old-school but good techniques. Taking a breather from the feverish pace of our daily lives, our food promises to remove the frivolous and keep the essentials of down-to-earth comfort with a selection that matters to the heart and close to home.",
    },
    {
      image: "/images/BS1.png",
      text: "The coffee bar serves specialty-grade signature blends and single-origin coffee as espressos and pour-overs roasted fresh in our facility. Step in and watch our baristas make it all look easy as you enjoy your cup sip after sip.",
    },
    { image: "/images/BS3.png", text: "SPECIALTY GRADE COFFEE" },
    { image: "/images/BS6.png", text: "Come visit us at Bluesmith!" },
  ];

  return (
    <div>
      <div className="containertopbluesmith">
        <img
          src="/images/bluesmithlogo.png"
          alt="Center Image"
          className="center-imageblue"
          style={{
            marginTop: "160px",
            marginLeft: "480px",
            // position: "center",
          }}
        />
        <div className="cloudairplane cloud1">
          <div className="light"></div>
          <img
            src="https://images.vexels.com/media/users/3/145795/isolated/preview/05cd33059a006bf49006097af4ccba98-plane-in-flight-by-vexels.png"
            style={{ marginTop: "360px" }}
            alt="Plane in flight"
          />
        </div>
        <div id="backgroundclouds">
          <div className="x1">
            <div className="cloud"></div>
          </div>

          <div className="x2">
            <div className="cloud"></div>
          </div>

          <div className="x3">
            <div className="cloud"></div>
          </div>

          <div className="x4">
            <div className="cloud"></div>
          </div>

          <div className="x5">
            <div className="cloud"></div>
          </div>
        </div>
      </div>

      <div className="secondpageBS">
        <p style={{ textAlign: "center", padding: "100px", fontSize: "35px" }}>
          {" "}
          𝑭𝒊𝒏𝒅 𝒀𝒐𝒖𝒓 𝑪𝒐𝒎𝒇𝒐𝒓𝒕{" "}
        </p>
        <div className="grid-containerblue">
          {/* Map over each grid item */}
          {cards.map((card, index) => (
            <div key={index} className="grid-itemblue">
              <div className="card-containerblue">
                <div
                  ref={cardRefs[index]}
                  className="cardblue"
                  onClick={() => handleClick(index)}
                >
                  <div
                    className="front"
                    style={{
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* You can add additional content or styles here */}
                  </div>
                  <div className="back">{card.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bluesmith;
