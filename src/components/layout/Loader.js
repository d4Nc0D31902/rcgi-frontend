import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // if (!loading) {
  //   return null; // Don't show the loader if not loading
  // }

  return (
    <div>
      {!user && (
        <div className="loader">
          <div className="wineglass left">
            <div className="top"></div>
          </div>
          <div className="wineglass right">
            <div className="top"></div>
          </div>
        </div>
      )}
      {user && user.company === "None" && (
        <div className="loader">
          <div className="wineglass left">
            <div className="top"></div>
          </div>
          <div className="wineglass right">
            <div className="top"></div>
          </div>
        </div>
      )}
      {user && user.company === "Barcino" && (
        <div className="loader">
          <div className="wineglass left">
            <div className="top"></div>
          </div>
          <div className="wineglass right">
            <div className="top"></div>
          </div>
        </div>
      )}
      {user && user.company === "Meat Depot" && (
        <div style={{ height: "100vh" }}>
          <div id="cooking">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div id="area">
              <div id="sides">
                <div id="pan"></div>
                <div id="handle"></div>
              </div>
              <div id="pancake">
                <div id="pastry"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && user.company === "Single Origin" && (
        <div style={{ height: "100vh" }}>
          <div className="loader-holder">
            <div className="loader">
              <svg
                id="loader-1"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9336 2.90402C19.0734 1.04456 16.4086 0 13.7784 0C11.1482 0 8.62572 1.04456 6.76552 2.90402L2.90402 6.76552C1.04456 8.62572 0 11.1482 0 13.7784C0 15.5542 0.618368 17.281 1.5 18.7879C1.5 18.7879 3.021 18.2565 3.99873 17.9253C4.34198 17.809 4.87829 17.6292 4.87829 17.6292C6.28537 17.1565 7.56383 16.3643 8.61343 15.3147C9.66304 14.2651 10.4553 12.9866 10.928 11.5795C11.5124 9.84311 12.4805 8.26065 13.7603 6.94964C15.0401 5.63862 16.4203 4.94558 18.3206 4.00669C19.3136 3.51608 20.9336 2.90402 20.9336 2.90402Z"
                  fill="#463233"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3638 24C7.73358 24 5.21105 22.9554 3.35085 21.096L3.04622 20.7914L5.98096 19.9676C7.7028 19.3415 9.2615 18.3356 10.5413 17.0246C11.8211 15.7136 12.7892 14.1311 13.3736 12.3947C13.8463 10.9877 14.6385 9.7092 15.6881 8.65959C16.7378 7.60999 18.0162 6.81777 19.4233 6.34504C19.4233 6.34504 19.9628 6.17444 20.3029 6.049C21.2453 5.7013 22.6376 4.96917 22.6376 4.96917C23.6131 6.53211 24.1422 8.34956 24.1422 10.2216C24.1422 12.8518 23.0976 15.3743 21.2382 17.2345L17.3767 21.096C15.5165 22.9554 12.994 24 10.3638 24Z"
                  fill="#463233"
                />
              </svg>
              <svg
                id="loader-2"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9336 2.90402C19.0734 1.04456 16.4086 0 13.7784 0C11.1482 0 8.62572 1.04456 6.76552 2.90402L2.90402 6.76552C1.04456 8.62572 0 11.1482 0 13.7784C0 15.5542 0.618368 17.281 1.5 18.7879C1.5 18.7879 3.021 18.2565 3.99873 17.9253C4.34198 17.809 4.87829 17.6292 4.87829 17.6292C6.28537 17.1565 7.56383 16.3643 8.61343 15.3147C9.66304 14.2651 10.4553 12.9866 10.928 11.5795C11.5124 9.84311 12.4805 8.26065 13.7603 6.94964C15.0401 5.63862 16.4203 4.94558 18.3206 4.00669C19.3136 3.51608 20.9336 2.90402 20.9336 2.90402Z"
                  fill="#463233"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3638 24C7.73358 24 5.21105 22.9554 3.35085 21.096L3.04622 20.7914L5.98096 19.9676C7.7028 19.3415 9.2615 18.3356 10.5413 17.0246C11.8211 15.7136 12.7892 14.1311 13.3736 12.3947C13.8463 10.9877 14.6385 9.7092 15.6881 8.65959C16.7378 7.60999 18.0162 6.81777 19.4233 6.34504C19.4233 6.34504 19.9628 6.17444 20.3029 6.049C21.2453 5.7013 22.6376 4.96917 22.6376 4.96917C23.6131 6.53211 24.1422 8.34956 24.1422 10.2216C24.1422 12.8518 23.0976 15.3743 21.2382 17.2345L17.3767 21.096C15.5165 22.9554 12.994 24 10.3638 24Z"
                  fill="#463233"
                />
              </svg>
              <svg
                id="loader-3"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9336 2.90402C19.0734 1.04456 16.4086 0 13.7784 0C11.1482 0 8.62572 1.04456 6.76552 2.90402L2.90402 6.76552C1.04456 8.62572 0 11.1482 0 13.7784C0 15.5542 0.618368 17.281 1.5 18.7879C1.5 18.7879 3.021 18.2565 3.99873 17.9253C4.34198 17.809 4.87829 17.6292 4.87829 17.6292C6.28537 17.1565 7.56383 16.3643 8.61343 15.3147C9.66304 14.2651 10.4553 12.9866 10.928 11.5795C11.5124 9.84311 12.4805 8.26065 13.7603 6.94964C15.0401 5.63862 16.4203 4.94558 18.3206 4.00669C19.3136 3.51608 20.9336 2.90402 20.9336 2.90402Z"
                  fill="#463233"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3638 24C7.73358 24 5.21105 22.9554 3.35085 21.096L3.04622 20.7914L5.98096 19.9676C7.7028 19.3415 9.2615 18.3356 10.5413 17.0246C11.8211 15.7136 12.7892 14.1311 13.3736 12.3947C13.8463 10.9877 14.6385 9.7092 15.6881 8.65959C16.7378 7.60999 18.0162 6.81777 19.4233 6.34504C19.4233 6.34504 19.9628 6.17444 20.3029 6.049C21.2453 5.7013 22.6376 4.96917 22.6376 4.96917C23.6131 6.53211 24.1422 8.34956 24.1422 10.2216C24.1422 12.8518 23.0976 15.3743 21.2382 17.2345L17.3767 21.096C15.5165 22.9554 12.994 24 10.3638 24Z"
                  fill="#463233"
                />
              </svg>
              <svg
                id="loader-4"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.9336 2.90402C19.0734 1.04456 16.4086 0 13.7784 0C11.1482 0 8.62572 1.04456 6.76552 2.90402L2.90402 6.76552C1.04456 8.62572 0 11.1482 0 13.7784C0 15.5542 0.618368 17.281 1.5 18.7879C1.5 18.7879 3.021 18.2565 3.99873 17.9253C4.34198 17.809 4.87829 17.6292 4.87829 17.6292C6.28537 17.1565 7.56383 16.3643 8.61343 15.3147C9.66304 14.2651 10.4553 12.9866 10.928 11.5795C11.5124 9.84311 12.4805 8.26065 13.7603 6.94964C15.0401 5.63862 16.4203 4.94558 18.3206 4.00669C19.3136 3.51608 20.9336 2.90402 20.9336 2.90402Z"
                  fill="#463233"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.3638 24C7.73358 24 5.21105 22.9554 3.35085 21.096L3.04622 20.7914L5.98096 19.9676C7.7028 19.3415 9.2615 18.3356 10.5413 17.0246C11.8211 15.7136 12.7892 14.1311 13.3736 12.3947C13.8463 10.9877 14.6385 9.7092 15.6881 8.65959C16.7378 7.60999 18.0162 6.81777 19.4233 6.34504C19.4233 6.34504 19.9628 6.17444 20.3029 6.049C21.2453 5.7013 22.6376 4.96917 22.6376 4.96917C23.6131 6.53211 24.1422 8.34956 24.1422 10.2216C24.1422 12.8518 23.0976 15.3743 21.2382 17.2345L17.3767 21.096C15.5165 22.9554 12.994 24 10.3638 24Z"
                  fill="#463233"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      {user && user.company === "Bluesmith" && (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loader2">
            {[...Array(20)].map((_, i) => (
              <span key={i} style={{ "--i": i + 1 }}></span>
            ))}
            <div className="plane"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
