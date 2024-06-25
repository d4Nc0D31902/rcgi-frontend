import React, { useEffect, useRef } from "react";
import MetaData from "../layout/MetaData";
import "./MeatDepot.css";
import { color } from "framer-motion";

const MeatDepot = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    const container = document.querySelector(".containertopmeatdepot");

    if (container) {
      const numLines = Math.ceil(container.clientWidth / 10);

      for (let i = 0; i < numLines; i++) {
        const line = document.createElement("div");
        line.classList.add("linemeat");
        line.style.left = `${i * 40}px`;

        if (i % 2 === 0) {
          line.style.backgroundColor = "white";
        }

        container.appendChild(line);

        const images = container.querySelectorAll(".content img");
        images.forEach((image, index) => {
          imageRefs.current[index] = image;
          image.style.transform = "rotate(0deg)";
        });
      }
    }
  }, []);

  useEffect(() => {
    const rotateImage = (image) => {
      let angle = 0;
      const intervalId = setInterval(() => {
        angle += 1;
        image.style.transform = `rotate(${angle}deg)`;
      }, 10);
      return () => clearInterval(intervalId);
    };
    imageRefs.current.forEach((image) => {
      rotateImage(image);
    });
    return () => {
      imageRefs.current.forEach((image) => {
        clearInterval(image.dataset.intervalId);
      });
    };
  }, [imageRefs]);

  return (
    <div>
      <MetaData title={"Meat Depot"} />
      <div className="containertopmeatdepot">
        <img
          classList="img-meat"
          src="/images/meatdepotlogo.png"
          alt="Center Image"
          className="center-imagemeat"
        />
      </div>
      <div className="secondpageMDmeat">
        <p
          classname="md-p p-meat"
          style={{
            position: "center",
            padding: "100px",
            fontSize: "22px",
            color: "white",
          }}
        >
          𝑾𝒆 𝒑𝒓𝒐𝒗𝒊𝒅𝒆 𝒎𝒆𝒂𝒕 𝒆𝒏𝒕𝒉𝒖𝒔𝒊𝒂𝒔𝒕𝒔 𝒘𝒊𝒕𝒉 𝒂 𝒖𝒏𝒊𝒒𝒖𝒆 𝒐𝒑𝒑𝒐𝒓𝒕𝒖𝒏𝒊𝒕𝒚 𝒕𝒐 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆
          𝒎𝒆𝒂𝒕 𝒂𝒏𝒅 𝒎𝒆𝒂𝒕 𝒑𝒓𝒐𝒅𝒖𝒄𝒕𝒔. 𝑶𝒖𝒓𝒔 𝒊𝒔 𝒏𝒐 𝒐𝒓𝒅𝒊𝒏𝒂𝒓𝒚 𝒔𝒕𝒆𝒂𝒌𝒉𝒐𝒖𝒔𝒆. 𝑶𝒖𝒓 𝒄𝒖𝒔𝒕𝒐𝒎𝒆𝒓𝒔
          𝒄𝒂𝒏 𝒄𝒉𝒐𝒐𝒔𝒆 𝒕𝒉𝒆 𝒄𝒖𝒕, 𝒔𝒊𝒛𝒆, 𝒔𝒂𝒖𝒄𝒆, 𝒂𝒏𝒅 𝒔𝒊𝒅𝒆𝒔 𝒐𝒇 𝒕𝒉𝒆 𝒔𝒕𝒆𝒂𝒌 𝒕𝒐 𝒕𝒉𝒆𝒊𝒓
          𝒍𝒊𝒌𝒊𝒏𝒈.{" "}
        </p>
        <div className="containermeatdepot">
          <div className="rowmeat">
            <div className="columnmeat">
              <div className="contentmeat">
                <img
                  className="img-meat"
                  src="/images/md5.png"
                  alt="Image 1"
                  ref={(el) =>
                    (imageRefs.current[imageRefs.current.length] = el)
                  }
                />
              </div>
            </div>
            <div className="columnmeat">
              <div className="contentmeat">
                <img className="img-meat" src="/images/md4.png" alt="Image 2" />
              </div>
            </div>
            <div className="columnmeat">
              <div className="contentmeat">
                <img
                  className="img-meat"
                  src="/images/md6.png"
                  alt="Image 3"
                  ref={(el) =>
                    (imageRefs.current[imageRefs.current.length] = el)
                  }
                />
              </div>
            </div>
          </div>
          <div className="rowmeat">
            <div className="columnmeat">
              <div className="contentmeat">
                <img
                  className="img-meat"
                  src="/images/md1.png"
                  alt="Image 4"
                  ref={(el) =>
                    (imageRefs.current[imageRefs.current.length] = el)
                  }
                />
              </div>
            </div>
            <div className="columnmeat">
              <div className="contentmeat">
                <img className="img-meat" src="/images/md3.png" alt="Image 5" />
              </div>
            </div>
            <div className="columnmeat">
              <div className="contentmeat">
                <img
                  className="img-meat"
                  src="/images/md2.png"
                  alt="Image 6"
                  ref={(el) =>
                    (imageRefs.current[imageRefs.current.length] = el)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeatDepot;
