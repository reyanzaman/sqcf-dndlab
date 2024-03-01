// Import the stylesheet at the top of your LoadingScreen.js
import "../../styles/loader.css"; // Adjust the path as necessary

import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
        {/* Loading text */}
        <div className="text-white lg:mb-8 mb-20 lg:text-[2em] text-2xl text-center w-[85%] appear">
            Quayum Chowdhury&rsquo;s artistry and teaching have profoundly shaped
            Bangladesh&rsquo;s cultural and artistic landscape, inspiring future
            generations.
        </div>

        {/* Loading bar container */}
        <div className="loading-bar-container">
            {/* Loading bar */}
            <div className="loading-bar"></div>
        </div>
    </div>
  );
};

export default LoadingScreen;
