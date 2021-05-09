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

// startVideo()

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
    
    // setInterval(async () => {
    const myFunction = async () => {
        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptors();
        // console.log("detections[0].expressions" + detections[0].expressions);
        if (detections != null) {
            expressionsArray.push(detections[0].expressions);
        }
        console.log(detections);
        resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }

    setInterval(myFunction, 3000);

    return {
        expressions: expressionsArray,
    };
    
});  