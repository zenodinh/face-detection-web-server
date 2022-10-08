const express = require("express")
const faceapi = require("face-api.js")
const fs = require("fs")
const path = require("path")
const app = express()

const port = 8000

const modelFolder = "../models"
const imageFolder = "../images"
const detectedImage = "node_detected.jpeg"
const origianlImage = "original.jpeg"
app.get("/", (req, res) => {
    res.status(200).json({
        Code: 200,
        Message: "Welcome to Quan Dinh Face Detection Node JS\nPOST to localhost:8000/detect to retrieve face detected image"
    })
})

app.post("/detect", async (req, res) => {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelFolder)
    console.log("path: ", path.join(imageFolder, origianlImage))
    const image = await faceapi.fetchImage(path.join(imageFolder, origianlImage))
    const detections = await faceapi.detectAllFaces(image)
    console.log("detections: ", detections)
    res.status(200).json({
        Code: 200,
        Message: "Detect image successfully"
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} ...`)
})
