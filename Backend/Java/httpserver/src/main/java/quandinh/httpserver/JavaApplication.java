package quandinh.httpserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quandinh.httpserver.Message.Message;

@SpringBootApplication
@RestController
@RequestMapping(path = "/")
public class JavaApplication {
    public static void main(String[] args) {
        SpringApplication.run(JavaApplication.class, args);
    }

    @GetMapping
    public Message welcome() {
        return new Message(200, "Welcome to Golang Face Detection web server. Please access http://localhost:8000/detect to detect faces in the picture", null);
    }
}
