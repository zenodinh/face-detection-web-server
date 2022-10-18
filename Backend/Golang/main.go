package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

type response struct {
	Code    int
	Message string
	Error   error
	Data    string
}

const imageFolder string = "../images"
const originalImage = "go_original.jpeg"
const detectedImage = "go_detected.jpeg"

func main() {
	r := mux.NewRouter()
	r.Use(CORS)
	r.HandleFunc("/", Hello).Methods(http.MethodGet)
	r.HandleFunc("/detect", GetImage).Methods(http.MethodPost)

	port := "8000"
	fmt.Println("Start server at localhost:" + port)

	log.Fatal(http.ListenAndServe(":"+port, r))
}

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	res := response{
		Code:    200,
		Message: "Welcome to Golang Face Detection web server. Please access http://localhost:8000/detect to detect faces in the picture",
	}
	_ = json.NewEncoder(w).Encode(res)
}

func GetImage(w http.ResponseWriter, r *http.Request) {
	file, fileHeader, err := r.FormFile("image")
	defer file.Close()
	if err != nil {
		res := response{
			Code:    http.StatusBadRequest,
			Message: "Can not parse form",
			Error:   err,
		}
		_ = json.NewEncoder(w).Encode(res)
		return
	}
	fmt.Printf("File name = %v\n", fileHeader.Filename)
	fmt.Printf("File header = %v\n", fileHeader.Header)
	f, err := os.Create(filepath.Join(imageFolder, originalImage))
	if err != nil {
		res := response{
			Code:    http.StatusBadRequest,
			Message: "Can not create a image file",
			Error:   err,
		}
		_ = json.NewEncoder(w).Encode(res)
		return
	}
	buffer := bytes.NewBuffer(nil)
	_, err = io.Copy(buffer, file)
	if err != nil {
		res := response{
			Code:    http.StatusBadRequest,
			Message: "Can not copy file to buffer",
			Error:   err,
		}
		_ = json.NewEncoder(w).Encode(res)
		return
	}
	if _, err = f.Write(buffer.Bytes()); err != nil {
		res := response{
			Code:    http.StatusBadRequest,
			Message: "Can not write bytes to file",
			Error:   err,
		}
		_ = json.NewEncoder(w).Encode(res)
		return
	}

	logger := zap.New(nil)
	_, err = DetectImage(filepath.Join(imageFolder, originalImage))
	if err != nil {
		logger.Info("Detect image error: " + err.Error())
		res := response{
			Code:    http.StatusBadRequest,
			Message: "Can not detect image",
			Error:   err,
		}
		_ = json.NewEncoder(w).Encode(res)
		return
	}
	data, _ := os.ReadFile(filepath.Join(imageFolder, detectedImage))
	w.Header().Set("Content-Type", "application/json")
	res := response{
		Code:    http.StatusOK,
		Message: "Detect face successfully",
		Error:   nil,
		Data:    string(data),
	}
	_ = json.NewEncoder(w).Encode(res)
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		fmt.Println("OK")

		next.ServeHTTP(w, r)
		return
	})
}
