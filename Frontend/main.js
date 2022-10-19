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
        var canvas = document.getElementById("detected");
        canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
        var fileinput = document.getElementById("myfile");
        var image = new SimpleImage(fileinput);
        image.drawTo(canvas);
    }
    else {
        console.log("Khong co file")
    }
}

async function draw(x, y, w, h) {
    var canvas = document.getElementById("detected");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.stroke();
}

const sendImage = function (event) {
    event.preventDefault()

    var file = document.getElementById("myfile").files[0]
    let formData = new FormData();
    if (file) {
        formData.append("image", file)
    }

    fetch("http://localhost:8000", {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        },
        // body: formData
    }).then(res => res.json().then(body => {
        console.log("Body: ", body)
        draw(100, 100, 100, 100)
        // for (i = 0; i < body.Data.length; ++i) {
        //     draw(100, 100, 100, 100)
        // }
    }))


}