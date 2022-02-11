var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.font = "15px Arial";

canvas.width = "620";
canvas.height = "150";

generateColors();

//called when user clicks on add color Button 
//adds a new color picker to the page
function addColor() {
    let colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'colorPicker';
    colorPicker.value = '#A72F2F';
    document.getElementById("colorPickerDiv").appendChild(colorPicker);
}

function removeColor() {
    document.getElementById("colorPickerDiv").removeChild(document.querySelector(".colorPicker"));
}



//paints white background
function paintBackground() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//generate colors and call newColor function
function generateColors() {
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
function downloadCanvas() {
    generateColors();
    let link = document.createElement("a");
    link.download = "colorPalette.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
