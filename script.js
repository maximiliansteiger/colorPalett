var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.font = "15px Arial";

canvas.width = "620";
canvas.height = "150";

document.querySelector("button").disabled = true;


//called when user clicks on add color Button 
//adds a new color picker to the page
function addColor() {
    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'colorPicker';
    colorPicker.value = '#A72F2F';
    document.getElementById("colorPickerDiv").appendChild(colorPicker);
}

//if the colorpickers are clicked the generateColors function is called
document.querySelector("body").addEventListener("change", generateColors);

//paints white background
function paintBackground() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//generate colors and call newColor function
function generateColors() {
    document.querySelector("button").disabled = false;
    let colors = document.querySelectorAll(".colorPicker");
    let lines = Math.ceil(document.querySelectorAll(".colorPicker").length / 5);
    let index = 0;
    let y = 0;
    
    canvas.height = lines * 150;
    paintBackground();

    for (let i = 0; i < lines; i++) {
        y = i * 130 + 20;
        index = 5 * i;

        let x = 20;
        let textHeight = y + 120;
        let textWidth = 50;

        for (let i = 0; i < 5; i++) {
            if (colors.item(index + i) != null) {
                newColor(100, 100, x, y, colors.item(index + i).value, textWidth, textHeight);
                x += 120;
                textWidth += 120;
            }
        }
    }
}

//create new color on canvas
function newColor(width, height, x, y, color, textWidth, textHeight) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(color, textWidth, textHeight);
}

//download canvas as image
function downloadCanvasAsImage() {
    let canvasImage = document.getElementById('canvas').toDataURL('image/png');
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = 'colorPalett.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
    xhr.open('GET', canvasImage);
    xhr.send();
}
