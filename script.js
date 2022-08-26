var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.font = "15px Arial";

//set solution
canvas.width = "620";
canvas.height = "150";

let popUpElement;

generateColors();
initScreen();

function initScreen() {
    for (let i = 0; i < 5; i++) {
        addColor();
    }

    document.querySelectorAll(".color-picker").forEach((element, index) => {
        element.addEventListener("change", function () {
            let color = element.value;
            element.parentElement.querySelector(".color-content").innerHTML = color;
        });
    });
}



//called when user clicks on add color Button
//adds a new color picker to the page
function addColor() {
    let hexString = getRandomHexString();
    let colorPickerHTML = `
    <div class="color-layout">
    <input type="color" value="${hexString}" class="color-picker">
        <p class="color-content">
            ${hexString}
        </p>
        <button class="remove-button-layout" onclick="setPopUpContent(this);changePopUp(true)">
            <p class="remove-button">X</p>
        </button>
    </div>`;
    // transform this html to node format
    let colorPickerNode = document
        .createRange()
        .createContextualFragment(colorPickerHTML);
    // append the node to the page
    document.querySelector(".content").appendChild(colorPickerNode);
}

function setPopUpContent(element) {
    popUpElement = element;
    document.querySelector(".pop-up h3").innerHTML =
        "Do you really want to delete this color?";
}

function removeColor(element) {
    document.querySelector(".content").removeChild(element.parentElement);
}

//paints white background
function paintBackground() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function triggerPopUpEvent() {
    if (popUpElement != null) {
        removeColor(popUpElement);
        popUpElement = null;
        document.querySelector(".pop-up h3").innerHTML =
            "Do you really want to generate random colors and delete all existing ones?";
    } else {
        generateRandomColors();
    }
}

function generateRandomColors() {

    document.querySelectorAll(".color-layout").forEach(element => {
        let newHex = getRandomHexString()
        element.querySelector('.color-picker').value = newHex;
        element.querySelector('.color-content').innerHTML = newHex;

    })
}

function changePopUp(showPopUp) {
    document.querySelector(".pop-up-layout").style.display = showPopUp ?
        "flex" :
        "none";
    if (!showPopUp) {
        document.querySelector(".pop-up h3").innerHTML =
            "Do you really want to generate random colors and delete all existing ones?";
        popUpElement = null;
    }
}

//generate colors and call newColor function
function generateColors() {
    let colors = document.querySelectorAll(".color-picker");
    let lines = Math.ceil(document.querySelectorAll(".color-picker").length / 5);
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
                newColor(
                    100,
                    100,
                    x,
                    y,
                    colors.item(index + i).value,
                    textWidth,
                    textHeight
                );
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

function getRandomHexString() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}