console.log("Buoc 1")

const showImage = function (event) {
    event.preventDefault()

    console.log("Chay khi submit")
    document.getElementById("text").innerText = "Submit"

    var file = document.getElementById("myfile").files[0]
    if (file) {
        console.log("File = ", file.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            document.getElementById("original").src = reader.result
        }
        fetch("http://localhost:8000", {
            method: "GET",
            mode: "no-cors",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        }).then(res => console.log("response: ", res)).catch(reason => console.log("Reason: ", reason))
    }
    else {
        console.log("Khong co file")
    }
}