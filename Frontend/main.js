const showImage = function (event) {
    event.preventDefault()
    var file = document.getElementById("myfile").files[0]
    if (file) {
        console.log("File = ", file.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            document.getElementById("original").src = reader.result
        }
    }
    else {
        console.log("Khong co file")
    }
}

const sendImage = function (event) {
    event.preventDefault()

    var file = document.getElementById("myfile").files[0]
    let formData = new FormData();
    if (file) {
        formData.append("image", file)
    }

    fetch("http://localhost:8000/detect", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: formData
    }).then(res => res.json()).then(body => {
        console.log("Message: ", body.Message)
        document.getElementById("original").src = body.Data
    })
}