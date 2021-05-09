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
          fontSize: "8em",
          fontWeight: "bold",
        }}
      >
    <div class="">
    <div class="test" id="upload-box">
    <div>👋 Hello.<div className="inline opacity-50">Welcome to RANT.</div></div>
      <input type="file" onChange={handleUpload} style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }} />
      <form><textarea placeholder='Job description here' 
      style={{
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ></textarea></form>
      {file && <ImageThumb image={file} />}

      {/** MODALSDKJFLSDKFJ */}
      {Modal ? (
                <button
                style={{
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                  onClick={() => ("./webcam")}
                  className="px-3 py-1 border-2 border-white rounded-lg flex flex-row w-auto"
                >
                  <p style={{
                  fontSize: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                    <em>Submit</em>
                  </p>
                </button>
            ) : null}

      <footer className="text-white mt-8 md:mt-16 pl-12 md:pl-20 mb-5 flex flex-col space-y-4 text-xs sm:text-sm">
        <div className="">
          Copyright {new Date().getFullYear()} RANT.
        </div>
      </footer>
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





