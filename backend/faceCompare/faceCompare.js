// "use strict";

// import "@tensorflow/tfjs-node";

// import * as faceapi from "face-api.js";

// import * as canvas from 'canvas';
// const { Canvas, Image, ImageData } = canvas
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

// import fs from "fs";

// // Promise.all([
// //     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
// //     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
// //     faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// // ]).then(start)

// // function start() {
// //     const image = fs.readFileSync()
// //     const detections = await faceapi.detectAllFaces(image)
// //     .withFaceLandmarks()
// //     .withFaceDescriptors()
// // }

// // function loadLabeledImages() {
// //     const labels = [];
// // }

// function getLabels() {
//   return fs.readdirSync("./models");
// }

// async function loadLabeledImages() {
//   const labels = getLabels();
//   return Promise.all(
//     labels.map(async (label) => {
//       const descriptions = [];
//       const amountOfImages = fs.readdirSync(`./models/${label}`).length;
//       console.log(amountOfImages)
//       for (let i = 0; i < amountOfImages; i++) {
//         const img = fs.readFileSync(`./models${label}/${i}.jpg`)
//         console.log(img)
//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();
//         descriptions.push(detections.descriptor);
//       }
//       return new faceapi.LabeledFaceDescriptors(label, descriptions);
//     })
//   );
// }

// async function start() {
//   const labeledDescriptors = loadLabeledImages();
//   const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
//   const faceToCheck = await faceapi
//     .detectSingleFace("./federer.jpg")
//     .withFaceLandmarks()
//     .withFaceDescriptor();

//   if (faceToCheck) {
//     const bestMatch = faceMatcher.findBestMatch(faceToCheck.descriptor);
//     console.log(bestMatch.toString());
//   }
// }

// start();
