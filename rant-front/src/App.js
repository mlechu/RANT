import React, { Component } from 'react';
import { useState } from "react";
import { Router, Route, Switch } from "react-router";
import Modal from 'react-modal';
import './App.css';
// import Webcamera from './webcam'

function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2em",
        }}
      >
    <div className="row">
    <div className="col-lg-1 col-centered" id="upload-box">
      <h1>RANT</h1>
      <input type="file" onChange={handleUpload} />
      <br></br>
      <form><textarea placeholder='Job description here'></textarea></form>
      {file && <ImageThumb image={file} />}

      {/** MODAL */}
      {Modal ? (
                <button
                  onClick={() => ("/")}
                  className="px-3 py-1 border-2 border-white rounded-lg flex flex-row w-auto"
                >
                  <p>
                    <em>Submit</em>
                  </p>
                </button>
            ) : null}

    </div></div></div>
  );
}

/**
 * Component to display thumbnail of image.
 */
 const ImageThumb = ({ image }) => {
  /** return <img src={URL.createObjectURL(image)} alt={image.name} />;  for preview */
};

export default function App() {
  return (
    <div>
      <FileUpload />
      {/* <Webcamera displaytext="Hello, Emily!"/>, */}
    </div>
  );
}


