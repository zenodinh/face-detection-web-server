package quandinh.httpserver.Message;

public class Message {
    int Code;
    String Message;
    String Data;

    public Message(int code, String message, String data) {
        Code = code;
        Message = message;
        Data = data;
    }

    public int getCode() {
        return Code;
    }

    public void setCode(int code) {
        Code = code;
    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public String getData() {
        return Data;
    }

    public void setData(String data) {
        Data = data;
    }

    @Override
    public String toString() {
        return "{" +
                "Code: " + Code +
                "Message: " + Message +
                "Data: " + Data + "}";
    }
}
