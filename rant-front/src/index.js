import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import Webcam from "react-webcam";

// const WebcamComponent = () => <Webcam />;

// class WebcamCapture extends React.Component {
//   render() {
//     const videoConstraints = {
//       width: 1280,
//       height: 720,
//       facingMode: "user"
//     };

//     return <Webcam videoConstraints={videoConstraints} />;
//   }
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <WebcamCapture /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
