import React, { useState } from "react";
import { storageRef } from "../../firebase";

import { UploadPreview } from "../UploadPreview/UploadPreview";
import { Message } from "../Message/Message";
import UploadIllustration from "../../assets/image-upload.svg";

import "./DragAndDrop.css";

export const DragAndDrop = ({ dispatch, data }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

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

    const supportedFileTypes = ["image/jpeg", "image/png"];
    const { type } = event.dataTransfer.files[0];

    if (supportedFileTypes.indexOf(type) > -1) {
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
            setMessage("An error has occurred. Please reload and try again.");
          }
        );
      });

      if (files) {
        dispatch({ type: "AddToList", files });
        dispatch({ type: "AddToDropZone", inDropZone: false });
      }
    } else {
      setMessage("Please upload an a .png or .jpg file.");
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
        <Message message={message} />
      </div>

      <div className="upload-file-list">
        {data.fileList.map((file) => {
          return <UploadPreview progress={progress} file={file} />;
        })}
      </div>
    </>
  );
};
