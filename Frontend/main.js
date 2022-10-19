const showImage = function () {
    var fileinput = document.getElementById("myfile")
    var imgcanvas = document.getElementById("inputCanvas");
    var image = new SimpleImage(fileinput);
    image.drawTo(imgcanvas);
}

const showImageOutput = function () {
    var fileinput = document.getElementById("myfile")
    var imgcanvas = document.getElementById("outputCanvas");
    var image = new SimpleImage(fileinput);
    image.drawTo(imgcanvas);
}


async function draw(x, y, w, h) {
    var canvas = document.getElementById("outputCanvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "green";
    ctx.stroke();
}

const sendImage = async function () {

    showImageOutput();
    var file = document.getElementById("myfile")
    let formData = new FormData();
    formData.append("image", file.files[0])

    const rawRes = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData
    })

    const res = await rawRes.json();

    for (let i = 0; i < res.Data.length; i++) {
        let box = res.Data[i];
        await draw(box.x, box.y, box.w, box.h)
    }
}