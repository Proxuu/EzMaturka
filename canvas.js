const backgroundCanvas = document.getElementById('backgroundCanvas');
const backgroundContext = backgroundCanvas.getContext('2d');
const drawingCanvas = document.getElementById('drawingCanvas');
const drawingContext = drawingCanvas.getContext('2d');

let rysowanie = false;
let gumkaWlaczona = false;
let pisakWlaczony = true;
let rysikSzerokosc = 2; // Domyślnie szerokość pisaka
let gumkaSzerokosc = 20; // Domyślnie szerokość gumki
let kolorPisaka = '#000000'; // Domyślny kolor pisaka

const maxHistorySize = 50;
let history = [];
let historyIndex = -1;

const ustawRozmiarCanvasa = () => {
    const width = drawingCanvas.parentElement.clientWidth;
    const height = drawingCanvas.parentElement.clientHeight;

    drawingCanvas.width = width;
    drawingCanvas.height = height;
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;

    rysujTloKratkowane();
};

const rysujTloKratkowane = () => {
    const rozmiarKratki = 20;
    backgroundContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    backgroundContext.strokeStyle = '#ddd';
    backgroundContext.lineWidth = 0.5;

    for (let x = 0; x <= backgroundCanvas.width; x += rozmiarKratki) {
        backgroundContext.beginPath();
        backgroundContext.moveTo(x, 0);
        backgroundContext.lineTo(x, backgroundCanvas.height);
        backgroundContext.stroke();
    }

    for (let y = 0; y <= backgroundCanvas.height; y += rozmiarKratki) {
        backgroundContext.beginPath();
        backgroundContext.moveTo(0, y);
        backgroundContext.lineTo(backgroundCanvas.width, y);
        backgroundContext.stroke();
    }
};

const saveState = () => {
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    history.push(drawingCanvas.toDataURL());
    if (history.length > maxHistorySize) {
        history.shift();
    } else {
        historyIndex++;
    }
};

const restoreState = (index) => {
    if (index < 0 || index >= history.length) return;
    const img = new Image();
    img.src = history[index];
    img.onload = () => {
        drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
        drawingContext.drawImage(img, 0, 0);
    };
};

const rozpocznijRysowanie = (event) => {
    rysowanie = true;
    const rect = drawingCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    drawingContext.beginPath();
    drawingContext.moveTo(x, y);
    saveState();
};

const zakonczRysowanie = () => {
    rysowanie = false;
    drawingContext.beginPath();
};

const rysuj = (event) => {
    if (!rysowanie) return;

    const rect = drawingCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    drawingContext.lineWidth = gumkaWlaczona ? gumkaSzerokosc : rysikSzerokosc;
    drawingContext.lineCap = 'round';

    if (gumkaWlaczona) {
        drawingContext.globalCompositeOperation = 'destination-out';
        drawingContext.arc(x, y, gumkaSzerokosc / 2, 0, Math.PI * 2, false);
        drawingContext.fill();
        drawingContext.globalCompositeOperation = 'source-over';
    } else {
        drawingContext.strokeStyle = kolorPisaka;
        drawingContext.lineTo(x, y);
        drawingContext.stroke();
    }

    drawingContext.beginPath();
    drawingContext.moveTo(x, y);
};

const przelaczGumke = () => {
    gumkaWlaczona = !gumkaWlaczona;
    document.getElementById('gumka').classList.toggle('active', gumkaWlaczona);
    pisakWlaczony = !gumkaWlaczona;
    document.getElementById('pen').classList.toggle('active', !gumkaWlaczona);
};

const wlaczPisak = () => {
    gumkaWlaczona = false;
    pisakWlaczony = true;
    document.getElementById('gumka').classList.remove('active');
    document.getElementById('pen').classList.add('active');
};

const wyczyscCanvas = () => {
    drawingContext.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    saveState();
};

const cofnij = () => {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState(historyIndex);
    }
};

const ponow = () => {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        restoreState(historyIndex);
    }
};

const aktualizujGruboscPisaka = (event) => {
    rysikSzerokosc = event.target.value;
    document.getElementById('pen-width-value').textContent = rysikSzerokosc;
};

const aktualizujGruboscGumki = (event) => {
    gumkaSzerokosc = event.target.value;
    document.getElementById('eraser-width-value').textContent = gumkaSzerokosc;
};

const zmienKolorPisaka = (event) => {
    kolorPisaka = event.target.value;
};

window.addEventListener('resize', ustawRozmiarCanvasa);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gumka').addEventListener('click', przelaczGumke);
    document.getElementById('pen').addEventListener('click', wlaczPisak);
    document.getElementById('clear').addEventListener('click', wyczyscCanvas);
    document.getElementById('undo').addEventListener('click', cofnij);
    document.getElementById('redo').addEventListener('click', ponow);
    drawingCanvas.addEventListener('mousedown', rozpocznijRysowanie);
    drawingCanvas.addEventListener('mouseup', zakonczRysowanie);
    drawingCanvas.addEventListener('mousemove', rysuj);
    drawingCanvas.addEventListener('mouseout', zakonczRysowanie);

    
    document.getElementById('pen-width').addEventListener('input', aktualizujGruboscPisaka);
    document.getElementById('eraser-width').addEventListener('input', aktualizujGruboscGumki);
    document.getElementById('pen-color').addEventListener('input', zmienKolorPisaka);

    ustawRozmiarCanvasa();
    rysujTloKratkowane();
});


const addBounceEffect = (event) => {
    event.target.classList.add('fa-bounce');
};


const removeBounceEffect = (event) => {
    event.target.classList.remove('fa-bounce');
};


const iconElements = document.querySelectorAll('#toolbar i');


iconElements.forEach(icon => {
    icon.addEventListener('mouseenter', addBounceEffect);
    icon.addEventListener('mouseleave', removeBounceEffect);
});
