import React from "react";
import "./ProgressBar.css";

export const ProgressBar = (props) => {
  return (
    <>
      <progress value={props.progress} max="100" className="progress-bar" />
    </>
  );
};
