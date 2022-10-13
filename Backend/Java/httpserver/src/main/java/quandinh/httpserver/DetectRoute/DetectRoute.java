package quandinh.httpserver.DetectRoute;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import quandinh.httpserver.Message.Message;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@RestController
@RequestMapping(path = "/detect")
public class DetectRoute {
    @PostMapping
    public Message postHandler(@RequestParam("image") MultipartFile image) throws IOException {
        System.out.println("Filename: " + image.getOriginalFilename());
        String basePath = System.getProperty("user.dir");

        File file = new File(Paths.get(basePath, "../images", "java_original.jpeg").toString());
        if (file.createNewFile()) {
            System.out.println("New file: " + file.getName());
        } else {
            System.out.println("File already exists");
        }
        try (FileOutputStream outputStream = new FileOutputStream(file)) {
            outputStream.write(image.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        boolean ok = DetectService.detectImage();
        if (!ok)
            return new Message(400, "Can not detect faces in the picture", null);

        Path path = Paths.get(basePath, "../images", "java_detected.jpeg");
        try (
                InputStream inputStream = new FileInputStream(path.toString());
        ) {
            long fileSize = new File(path.toString()).length();
            byte[] allBytes = new byte[(int) fileSize];

            inputStream.read(allBytes);
            return new Message(200, "Detect faces successfully", Arrays.toString(allBytes));
        }
    }
}
