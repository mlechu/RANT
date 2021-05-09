const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
]).then(
    startVideo()
);

async function startVideo() {
    navigator.getUserMedia (
        { video: {} },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
    );
}

let canvas;
let displaySize;
let resizedDetections;
let expressionsArray = [];

video.addEventListener('play', () => {
    canvas = faceapi.createCanvasFromMedia(video);
    document.getElementById("video-container").append(canvas);
    window.canvas = canvas;
    displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptors();
        
        if (detections != null) {
            expressionsArray.push(detections[0].expressions);
        }
        
        resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 3000)
    
    return {
        expressions: expressionsArray,
    };

});



// push expressions every 3 seconds: expressions object (contains expression names + values)
// send all data to backend when submit button is pushed



// audio:
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;

var output = document.getElementById('output');
recognition.onresult = function(event) {
  output.textContent = event.results[0][0].transcript;
  console.log(output.textContent);
};