package quandinh.httpserver.DetectRoute;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;

public class DetectService {
    public static boolean detectImage() {
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        CascadeClassifier faceDetector = new CascadeClassifier();
        faceDetector.load("../models/haarcascade_frontalface_default.xml");

        Mat image = Imgcodecs.imread("../images/java_original.jpeg");

        MatOfRect faceDetections = new MatOfRect();
        faceDetector.detectMultiScale(image, faceDetections);

        for (Rect rect : faceDetections.toArray()) {
            Imgproc.rectangle(image, new Point(rect.x, rect.y), new Point(rect.x + rect.width, rect.y + rect.height), new Scalar(0, 255, 0));
        }

        // Saving the output image
        String filename = "java_detected.jpeg";

        Imgcodecs.imwrite("../images/" + filename, image);
        return true;
    }
}
