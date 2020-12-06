import React, { useState } from "react";
import { storageRef } from "../../firebase";

import { UploadPreview } from "../UploadPreview/UploadPreview";
import UploadIllustration from "../../assets/image-upload.svg";

import "./DragAndDrop.css";

export const DragAndDrop = (props) => {
  const [progress, setProgress] = useState(0);

  const { dispatch, data } = props;

  const handleDragEnter = (event) => {
    event.preventDefault();
    dispatch({ type: "AddToDropZone", inDropZone: true });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    dispatch({ type: "AddToDropZone", inDropZone: true });
  };

  const handleDrop = (event) => {
    event.preventDefault();

    let files = [...event.dataTransfer.files];
    let files_with_preview = [];

    files.map((file) => {
      file["preview"] = URL.createObjectURL(file);
      files_with_preview.push(file);
      const uploadTask = storageRef.child(`images/${file.name}`).put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },

        (error) => {
          console.log(error);
        }
      );
    });

    if (files) {
      dispatch({ type: "AddToList", files });
      dispatch({ type: "AddToDropZone", inDropZone: false });
    }
  };

  return (
    <>
      <div className="upload-wrapper">
        <h1>Upload Media</h1>
        <div
          className="upload-container"
          onDrop={(event) => handleDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
          onDragEnter={(event) => handleDragEnter(event)}
        >
          <img
            src={UploadIllustration}
            alt="upload-illustration"
            className="illustration"
          />
          <p>
            Drag and drop <span>images</span> here.
          </p>
        </div>
      </div>
      <div className="upload-file-list">
        {data.fileList.map((file) => {
          return <UploadPreview progress={progress} file={file} />;
        })}
      </div>
    </>
  );
};
