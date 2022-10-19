const express = require("express")
const faceapi = require("face-api.js")
const path = require("path")
const cors = require('cors')
const multer = require('multer')
const canvas = require('canvas')
const fs = require("fs")
const { FaceMatch } = require("face-api.js")
const app = express()

app.use(cors())
const port = 8000

const modelFolder = "../models"
const imageFolder = "../images"
const detectedImage = "node_detected.jpeg"
const originalImage = "node_original.jpeg"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageFolder)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, originalImage)
    }
})

generateDrawBoxes = function(boxes) {
    points = []
    for (i = 0; i< boxes.length ; ++i) 
        points.push({
            x: boxes[i]._box._x,
            y: boxes[i]._box._y,
            w: boxes[i]._box._width,
            h: boxes[i]._box._height
        })
    return points
}

const upload = multer({ storage: storage })
app.get("/", (req, res) => {
    res.status(200).json({
        Code: 200,
        Message: "Welcome to Quan Dinh Face Detection Node JS\nPOST to localhost:8000/detect to retrieve face detected image"
    })
})

app.post("/detect", upload.single('image'), async (req, res) => {
    const { Canvas, Image, ImageData } = canvas
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelFolder)
    const image = await canvas.loadImage(path.join(imageFolder, originalImage));
    const boxes = await faceapi.detectAllFaces(image)
    
    res.status(200).json({
        Code: 200,
        Message: "Detect image successfully",
        Data: generateDrawBoxes(boxes)
    })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port} ...`)
})
