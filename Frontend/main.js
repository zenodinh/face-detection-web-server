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

const sendImage = async function (event) {
    event.preventDefault()

    var file = document.getElementById("myfile").files[0]
    let formData = new FormData();
    if (file) {
        formData.append("image", file)
    }

    raw = await fetch("http://localhost:8000/detect", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: formData
    })
    let res = await raw.json()
    document.getElementById("detected").src = res.Data
}