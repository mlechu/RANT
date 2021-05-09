import React, { Component } from 'react';
import { useState } from "react";
import { Router, Route, Switch } from "react-router";
import Modal from 'react-modal';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import logo from './logo.png';
import axios from "axios";
import expressionsData from './expressionsdata.png';

const expressAPI = "http://localhost:3001/api"

function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  const [firstPage, setFirstPage] = useState("display");
  const [secondPage, setSecondPage] = useState("none");
  const [thirdPage, setThirdPage] = useState("none");
  const [introPage, setIntroPage] = useState("none");
  
  const [seconds, setSeconds] = useState(60*6*2);
  const [questionCount, setQuestionCount] = useState(2)
  
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('BOOOM!');
    }
  });

  const [questions, setInterviewQ] = useState("Question 1: What was something you learned when creating your project SafeTravels?");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit() {
    displayIntroPage();
    const data = new FormData()
    data.append('file', file)
    try {
      axios.post(`${expressAPI}/pdf/`, data, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        } 
      })
      .then(res => { // then print response 
        console.log(res)
        // axios.get(`${expressAPI}/questions/`)
        //   .then((response) => {
        //   console.log(response);
        // });
      })   
      
    } catch (err) {
      console.error(err)
    }
  }

  function finishAnswers() {
    displayThirdPage();
  }
  
  function displayFirstPage() {
    setFirstPage('block');
    setIntroPage('none');
    setSecondPage('none');
    setThirdPage('none');
  }
  function displayIntroPage() {
    setFirstPage('none');
    setIntroPage('block');
    setSecondPage('none');
    setThirdPage('none');
  }
  function displaySecondPage() {
    setFirstPage('none');
    setIntroPage('none');
    setSecondPage('block');
    setThirdPage('none');
    // setQuestions
  }
  function displayThirdPage() {
    setFirstPage('none');
    setIntroPage('none');
    setSecondPage('none');
    setThirdPage('block');
  }
  

  let hardQuestions = [
    "What was it like working at Free Geek Vancouver?",
    "What were some challenges you ran into when creating Worklist Machine",
    "What are your favourite aspects of MongoDB?",
    "Why did you choose to use NodeJS in Worklist Machine?",
    "Can you tell me more about your SafeTravels project?",
  ];

  function nextQuestion() {
    setQuestionCount(questionCount + 1);
    if (questionCount > 6) {
      displayThirdPage();
    } else {
      setInterviewQ("Question " + questionCount + ": " + hardQuestions[questionCount]);
    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      flexDirection: "column", }}>
        
        <div id="first-page" style={{display: firstPage}}>
          <div style={{textAlign: "center",
                       alignItems: "center", 
                       justifyContent: "center",}}>
            <img src={logo} onClick={displayFirstPage}/>
          </div>
          <div className="test" id="upload-box">
            <input type="file" name="file" onChange={handleUpload} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              marginTop: "20px",
            }} />
            <form style={{
              paddingTop: "20px",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <textarea placeholder=' Paste job description here.'  // keep the spaces!
              style={{
                fontSize: "14px",
                fontFamily: "sans-serif",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "center",
                width: "400px",
                height: "100px",
                alignItems: "center",}}>
                </textarea>
            </form>
            {file && <ImageThumb image={file} />}

            {/** MODALSDKJFLSDKFJ */}
            {Modal ? (
              <button
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25px",
                }}
                onClick={handleSubmit}>
                <p style={{
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}>
                  <em style={{
                    alignItems: "center",
                  }}>Submit</em>
                </p>
              </button>
            ) : null}
          </div>
        </div>


        <div id="intro-page" style={{display: introPage}}>
          <div style={{textAlign: "center",
                       alignItems: "center", 
                       justifyContent: "center",}}>
            <img src={logo} 
                style={{
                  marginTop: "150px",
                  maxWidth: "250px",
                  textAlign: "top"
                }}
                onClick={displayFirstPage}
              />
          </div>
          <div style={{margin: "50px"}}>
            <h2>About</h2>
            <p>Robots. Are. Not. Taking. our jobs bro!! Not with R.A.N.T., the ultimate GPT-3 Interview Prepper.
               <br /> <br />
               You have already uploaded either your resume, your job description, or both. Now, Open AI's GPT-3 will generate
               relevant interview prompts based on the information it gathered from parsing through your input.

               <br /> <br />
               You will have 12 minutes in total to answer the given 6 questions. Each question is different, so R.A.N.T.
               gives you the freedom to choose how to allocate your time. You can keep an eye on the time using the countdown
               timer feature right above the video.

               <br /> <br />
               Your video is not recorded, however will be used for sentiment detection and analysis. At the end of the 12 minutes,
               a report will be generated based on the level of emotion(s) detection. Do what you want with that information, 
               hopefully it can provide useful feedback for you to adjust how you want to be perceived in interview situations.

               <br /> <br />
               You can end the interview early by clicking 'Finish Interview'.
            </p>
          </div>
          <div style={{textAlign: "center"}}>
            <button onClick={displaySecondPage} style={{margin: "50px"}}>
              Start Interview Prep
            </button>
          </div>
          
        </div>
          
          <div id="second-page" style={{display: secondPage}}> 
            <div style={{textAlign: "center"}}>
              <img src={logo} 
                style={{
                  marginTop: "250px",
                  maxWidth: "125px",
                  textAlign: "top"
                }}
                onClick={displayFirstPage}
              />
            </div>

            <div className="interview-question">
                <h2 style={{color: "#434343",
                            textAlign: "center",}}>
                            {questions}
                            {/* Question {questionNumber}: {question} */}
                            {/* Question 1: What was it like working at Google? */}
                            </h2>
                <p style={{
                  color: "#434343",
                  textAlign: "center",
                  marginBottom: "50px",
                  fontSize: "14px",
                }}>You have {seconds} seconds to answer.</p>
            </div>
            
            <div id="video-container" style={{textAlign: "center"}}>
              <video id="video" width="675" height="500" autoPlay muted></video>
            </div>
            
            <div id="buttons" style={{textAlign: "center",
                                      paddingTop: "20px",}}>
              <button id="next-question" onClick={nextQuestion}>
                Next Question
              </button>
              <br />
              <br />
              <button id="finish-interview" onClick={finishAnswers}>
                Finish Answering Questions
              </button>
            </div>
          </div>
          

          <div id="third-page" style={{display: thirdPage}}>
              <div style={{textAlign: "center"}}>
                <img src={logo} 
                  style={{
                    marginTop: "30px",
                    maxWidth: "200px",
                  }}
                  onClick={displayFirstPage}
                />
              </div>
              <div className="results">
                <h1>Your Results:</h1>
                <div>Your facial expressions indicated 70% happiness, 20% neutrality and 25% disgust.</div>
                <div style={{textAlign: "center"}}>
                  <img src={expressionsData} 
                      style={{width: "500px",
                              marginTop: "20px",
                              textAlign: "center",
                              justifyContent: "center",
                              alignItems: "center"}}/>
                </div>
              </div>
          </div>
          

          <footer style={{
            marginTop: "50px",
            paddingTop: "40px",
            marginBottom: "10px",
            textAlign: "center",
            fontSize: "12px",
          }}>
            <div className="footer">
              © Copyright {new Date().getFullYear()} R.A.N.T.
            </div>
          </footer>
        </div>
  );
}



/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />
    //  for preview */
};


export default function App() {

    // state = {
    //   firstPage: "block",
    //   secondPage: "none",
    //   thirdPage: "none"
    // }
  return (
    <div>
      <FileUpload />
    </div>
  );
}





