const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to track drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let brushColor = "#000000";  // Default color is black
let brushSize = 2;  // Default brush size

// Get color picker and brush size slider
const colorPicker = document.getElementById("colorPicker");
const brushSizeSlider = document.getElementById("brushSize");

// Event listeners for drawing
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = brushColor;  // Use the selected color
    ctx.lineWidth = brushSize;     // Use the selected brush size
    ctx.lineCap = "round";         // Smooth edges for brush strokes
    ctx.stroke();
    ctx.closePath();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Event listeners for color picker and brush size slider
colorPicker.addEventListener("input", (e) => {
    brushColor = e.target.value;  // Update brush color
});

brushSizeSlider.addEventListener("input", (e) => {
    brushSize = e.target.value;   // Update brush size
});

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save the canvas as an image
function saveCanvas() {
    const dataURL = canvas.toDataURL("image/png"); // Convert canvas to image URL
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png"; // Default file name
    link.click(); // Simulate click to trigger download
}
