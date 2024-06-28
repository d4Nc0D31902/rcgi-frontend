import React from "react";
import "./SingleOrigin.css"; // Adjust the path as per your file structure

const SingleOrigin = () => {
  return (
    <div>
      <div className="containertopSO">
        <div className="inner-header flex">
          <img
            src="/images/PinLocation.gif"
            alt="Barcino Logo 3d"
            style={{ width: "80px", height: "85px", pointerEvents: "none" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "45px",
          }}
        >
          <img
            src="/images/SOlogo.png"
            alt="SO Logo"
            style={{ width: "380px", height: "350px", marginTop: "-300px" }}
            className="no-hover"
          />
        </div>

        <div className="content">
          <div className="content__container">
            <p
              className="content__text"
              style={{ fontSize: "30px", fontWeight: "bolder" }}
            >
              WHERE
            </p>

            <ul className="content__list">
              <li className="content__list__item">𝒷𝓊𝓈𝒾𝓃𝑒𝓈𝓈 𝒹𝑒𝒶𝓁𝓈 𝒶𝓇𝑒 𝒸𝓁𝑜𝓈𝑒𝒹</li>
              <li className="content__list__item">𝑔𝑜𝑜𝒹 𝒾𝒹𝑒𝒶𝓈 𝒶𝓇𝑒 𝒻𝑜𝓇𝓂𝑒𝒹</li>
              <li className="content__list__item">𝒻𝓇𝒾𝑒𝓃𝒹𝓈𝒽𝒾𝓅𝓈 𝒶𝓇𝑒 𝓇𝑒𝓀𝒾𝓃𝒹𝓁𝑒𝒹</li>
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "45px",
            marginTop: "150px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            𝘤𝘰𝘮𝘪𝘯𝘨 𝘵𝘰𝘨𝘦𝘵𝘩𝘦𝘳 𝘧𝘳𝘰𝘮 𝘰𝘯𝘦 𝘴𝘪𝘯𝘨𝘭𝘦 𝘰𝘳𝘪𝘨𝘪𝘯
          </p>
        </div>
      </div>

      <div className="secondpageSO">
        <div className="containerSO">
          <div className="holderSO">
            <img src="/images/SO1.png" />
          </div>

          <div className="holderSO">
            <img src="/images/SO2.png" className="customHoverEffect" />
          </div>

          <div className="holderSO">
            <img src="/images/SO3.png" className="customHoverEffect" />
          </div>

          <div className="holderSO">
            <img src="/images/SO4.png" className="customHoverEffect" />
          </div>

          <div className="holderSO">
            <img src="/images/SO5.png" className="customHoverEffect"/>
          </div>

          <div className="holderSO">
            <img src="/images/SO6.png" className="customHoverEffect" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrigin;
