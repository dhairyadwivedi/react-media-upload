import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { CompressionSlider } from "../CompressionSlider/CompressionSlider";

import "./UploadPreview.css";

export const UploadPreview = (props) => {
  const { progress, file } = props;

  console.log(file);
  return (
    <>
      <div className="preview-wrapper">
        <img src={file.preview} alt="" className="preview-image" />
        <div className="preview-container">
          <div className="preview-info">
            <p className="file-name">{file.name}</p>
            <p className="progress-percentage">{progress}%</p>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>
      <CompressionSlider />
    </>
  );
};
