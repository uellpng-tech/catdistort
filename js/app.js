const btn = document.getElementById("btnUpload");
const input = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("download");
const texto = document.getElementById("texto");
const textodownload = document.getElementById("textodownload");

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {canvas.addEventListener(eventName, (e) => e.preventDefault());});

canvas.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;

    if (!files.length) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
        alert("Melzinho aceita apenas imagens.")
        return;
    }

    upload(file);

});

btn.addEventListener("click", () => {input.click()});

input.addEventListener("change", () => {
    const file = input.files[0];
    if (file) upload(file);
})

function upload(file) {
    const img = new Image();

    img.onload = function () {

        canvas.width = img.width 
        canvas.height = img.height

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let size = 18;

        for (let y = 0; y < canvas.height; y += size) {
            for (let x = 0; x < canvas.width; x += size){
                const pixel = ctx.getImageData(x, y, 1, 1).data;

                ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                ctx.fillRect(x, y, size, size);
            }
        }

        btn.style.display = "none";
        texto.style.display = "none";

        canvas.style.display = "block";
        downloadBtn.style.display = "block";
        textodownload.style.display = "block";
    };

    img.src = URL.createObjectURL(file);
};

canvas.addEventListener("click", () => input.click());

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a"); 
    link.download = "melzinho.png";
    link.href = canvas.toDataURL();
    link.click();

});

const gato = document.getElementById("gato");
const som = new Audio("assets/sons/gatobravo.m4a");

const imgNormal = "assets/imagens/gato.png";
const imgBravo = "assets/imagens/gato1.png";

gato.addEventListener("click", () => {

    gato.src = imgBravo;

    som.currentTime = 0;
    som.play();
});

som.addEventListener("ended", () => {
    gato.src = imgNormal;
});