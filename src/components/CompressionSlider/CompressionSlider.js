import React, { useState } from "react";
import "./CompressionSlider.css";

export const CompressionSlider = () => {
  const [compressionValue, setCompressionValue] = useState(0);

  const handleSliderChange = (event) => {
    setCompressionValue(event.target.value);
  };

  return (
    <div className="slider-container">
      <p>Compress Image: </p>
      <input
        className="slider"
        type="range"
        min="0"
        max="100"
        value={compressionValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};
