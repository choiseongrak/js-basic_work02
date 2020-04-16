const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const modeBtn = document.getElementById('jsMode');
const clearBtn = document.getElementById('jsClear');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2C2C2C';
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    modeBtn.innerText = 'FILL';
  } else {
    filling = true;
    modeBtn.innerText = 'PAINT';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS';
  link.click();

}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}
if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener('click', handleColorClick));
}
if (range) {
  range.addEventListener('input', handleRangeChange);
}
if (modeBtn) {
  modeBtn.addEventListener('click', handleModeClick);
}
if (clearBtn) {
  clearBtn.addEventListener('click', handleClearClick);
}
if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}