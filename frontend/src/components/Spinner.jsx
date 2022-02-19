import React from "react";

function Spinner() {
  return (
    <div className="absolute top-0 left-0 bg-black/50 min-w-full min-h-screen flex justify-center items-center">
      <div id="loading-bar-spinner" className="spinner">
        <div className="spinner-icon"></div>
      </div>
    </div>
  );
}

export default Spinner;
