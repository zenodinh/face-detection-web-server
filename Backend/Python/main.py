from flask import Flask, request, make_response, send_file
from flask_cors import CORS, cross_origin
import json
import os
import cv2 as cv
import base64
import numpy as np


#Constant
imageFolder = "../images"
originalImage = "python_original.jpeg"
detectedImage = "python_detected.jpeg"

# Init server
app = Flask(__name__)


CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/",methods=["GET"])
@cross_origin(origin="*")
def Welcome():
    return {
        "Code": 200,
        "Message": "Welcome to Golang Face Detection web server\nPlease access http://localhost:8000/detect to detect faces in the picture"
    }
    
@app.route("/detect", methods=["POST"])
@cross_origin(origin="*")
def GetImage():
    file = request.files.get("image")
    if file:
        file.save(os.path.join(imageFolder, originalImage))
        
        faceCascade = cv.CascadeClassifier(os.path.join("../models", "haarcascade_frontalface_default.xml"))
        image = cv.imread(os.path.join(imageFolder, originalImage))
        grayImage = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
        
        faces = faceCascade.detectMultiScale(grayImage)
        
        for (x,y,w,h) in faces:
            cv.rectangle(image, (x,y), (x+w, y+h), (0, 255, 0), 2)
            
        cv.imwrite(os.path.join(imageFolder, detectedImage), image)
        f = open(os.path.join(imageFolder, detectedImage), "rb")
        response = make_response(json.dumps({
            "Code": 200,
            "Message": "Detect face successfully",
            "Data": str(f.read())
        }))
        response.headers["Content-Type"] = "application/json"
        return response
    return {
        "Code": 400,
        "Message": "Can not get image"
    }
    
if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
