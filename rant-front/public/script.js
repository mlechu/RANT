// import { Date } from 'prismic-reactjs';
// import { format } from 'date-fns-tz';

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

    // }, 3000)
    
    return {
        expressions: expressionsArray,
    };


    // console.log("Detections: " + detections);
    // console.log("ResizedDetections: " + resizedDetections);
    // const results = resizedDetections.map((face) =>
    //     faceMatcher.findBestMatch(face.descriptor)
    // );

    // const timestamp = Date(document.data.event_date);
    // const formattedDate = format(timestamp,'MMMM dd, yyyy H:mm a');

    // return results.map((face, i) => {
    //     const result = resizedDetections[i];
    //     console.log(face);

    //     let expressionsList = Object.keys(resizedDetections.expressions).map((key) => [
    //         key,
    //         result.expressions[key],
    //     ]);
    
    //     expressionsList = expressionsList.filter (
    //         (expression) => expression[1] >= 0.1
    //     );

    //     return {
    //         expressions: expressionsList,
    //         time: formattedDate,
    //     };
    // });
    
});


// NEWER VERSION
// let getFaceInfo;
// window.getFaceInfo = getFaceInfo;

// video.addEventListener('play', () => {
//     console.log("entered video eventlistener");
//     canvas = faceapi.createCanvasFromMedia(video);
//     document.getElementById("video-container").append(canvas);
//     window.canvas = canvas;
//     displaySize = { width: video.width, height: video.height };
//     faceapi.matchDimensions(canvas, displaySize);
    
//     console.log("just before getFaceInfo");
//     getFaceInfo = async () => {
//         console.log("entered getfaceinfo");
//         const detections = await faceapi
//             .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//             .withFaceLandmarks()
//             .withFaceExpressions()
//             .withAgeAndGender()
//             .withFaceDescriptors();
//         // console.log(detections)
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//         faceapi.draw.drawDetections(canvas, resizedDetections)
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
//         faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

//         console.log("Detections: " + detections);
//         console.log("ResizedDetections: " + resizedDetections);
//         const results = resizedDetections.map((face) =>
//             faceMatcher.findBestMatch(face.descriptor)
//         );


//         const timestamp = Date(document.data.event_date);
//         const formattedDate = format(timestamp,'MMMM dd, yyyy H:mm a');

//         return results.map((face, i) => {
//             const result = resizedDetections[i];
//             console.log(face);

//             let expressionsList = Object.keys(resizedDetections.expressions).map((key) => [
//                 key,
//                 result.expressions[key],
//             ]);
        
//             expressionsList = expressionsList.filter (
//                 (expression) => expression[1] >= 0.1
//             );

//             return {
//                 expressions: expressionsList,
//                 time: formattedDate,
//             };
//         });
//     }

 
// });


// send data to backend every 5 secs: % of emotion + emotion name + timestamp + question #

// window.getFaceInfo = getFaceInfo;
// await getFaceInfo;