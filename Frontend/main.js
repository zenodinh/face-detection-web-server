const showImage = function () {
    var file = document.getElementById("myfile").files[0]
    if (file) {
        console.log("File = ", file.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            document.getElementById("original").src = reader.result
        }
        var canvas = document.getElementById("detected");
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

const sendImage = async function () {
    debugger
    console.log("Phai vo day chu")
    var file = document.getElementById("myfile")
    let formData = new FormData();
    if (file) {
        formData.append("image", file)
    }

    const rawRes = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData
    })

    const res = await rawRes.json()
    console.log("response: ", res)

    for (let i = 0; i < res.Data.length; ++i) {
        draw(res.Data[i].x, res.Data[i].y, res.Data[i].w, res.Data[i].h)
    }
}