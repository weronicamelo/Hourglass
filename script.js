// Configuração padrão
const defaultConfig = {
    tema: "claro",
    mostrarMilissegundos: true,
    alarmeAtivado: true,
    tamanhoInterface: "padrao"
};

// Carregar configuração salva ou padrão
let config = JSON.parse(localStorage.getItem("hourglass_config")) || defaultConfig;

// CONFIG PADRÃO
const defaultConfig = {
    tema: "claro",
    mostrarMilissegundos: true,
    alarmeAtivado: true,
    tamanhoInterface: "padrao"
};

// CARREGAR CONFIG SALVA OU PADRÃO
let config = JSON.parse(localStorage.getItem("hourglass_config")) || defaultConfig;

// ELEMENTOS
const display = document.getElementById("display");
const btnPlay = document.getElementById("btnPlay");
const btnReset = document.getElementById("btnReset");
const radioCron = document.getElementById("modoCron");
const radioTimer = document.getElementById("modoTimer");
const btn30 = document.getElementById("add30");
const btn60 = document.getElementById("add60");
const btn300 = document.getElementById("add300");

const temaClaro = document.getElementById("temaClaro");
const temaEscuro = document.getElementById("temaEscuro");
const checkMs = document.getElementById("mostrarMs");
const checkAlarm = document.getElementById("ativarAlarme");

// ESTADO
let running = false;
let timerMode = false;
let elapsed = 0;
let remaining = 0;
let interval = null;

// TEMA
function aplicarTema() {
    document.body.className = config.tema === "escuro" ? "dark" : "light";
}
aplicarTema();

// EXIBIÇÃO
function atualizarDisplay() {
    let t = timerMode ? remaining : elapsed;
    let m = Math.floor(t / 60000);
    let s = Math.floor((t % 60000) / 1000);
    let ms = t % 1000;

    display.textContent = config.mostrarMilissegundos
        ? `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}.${ms.toString().padStart(3,"0")}`
        : `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}
atualizarDisplay();

// LOOP
function start() {
    if (running) return;
    running = true;

    interval = setInterval(() => {
        if (timerMode) {
            remaining -= 10;
            if (remaining <= 0) {
                remaining = 0;
                stop();
                if (config.alarmeAtivado) alert("Tempo encerrado!");
            }
        } else {
            elapsed += 10;
        }
        atualizarDisplay();
    }, 10);
}

function stop() {
    running = false;
    clearInterval(interval);
}

function reset() {
    stop();
    elapsed = 0;
    remaining = 0;
    atualizarDisplay();
}

// EVENTOS
btnPlay.onclick = () => running ? stop() : start();
btnReset.onclick = reset;

radioCron.onclick = () => { timerMode = false; reset(); };
radioTimer.onclick = () => { timerMode = true; reset(); };

btn30.onclick = () => { remaining += 30000; atualizarDisplay(); };
btn60.onclick = () => { remaining += 60000; atualizarDisplay(); };
btn300.onclick = () => { remaining += 300000; atualizarDisplay(); };

temaClaro.onclick = () => { config.tema = "claro"; salvar(); };
temaEscuro.onclick = () => { config.tema = "escuro"; salvar(); };
checkMs.onchange = () => { config.mostrarMilissegundos = checkMs.checked; salvar(); };
checkAlarm.onchange = () => { config.alarmeAtivado = checkAlarm.checked; salvar(); };

function salvar() {
    localStorage.setItem("hourglass_config", JSON.stringify(config));
    aplicarTema();
}

// Estado
let running = false;
let timerMode = false;
let elapsed = 0;
let remaining = 0;
let interval = null;

// Tema
function aplicarTema() {
    document.body.className = config.tema === "escuro" ? "dark" : "light";
}
aplicarTema();

// Exibição
function atualizarDisplay() {
    let t = timerMode ? remaining : elapsed;
    let m = Math.floor(t / 60000);
    let s = Math.floor((t % 60000) / 1000);
    let ms = t % 1000;

    display.textContent = config.mostrarMilissegundos
        ? `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}.${ms.toString().padStart(3,"0")}`
        : `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}
atualizarDisplay();

// Tempo
function start() {
    if (running) return;
    running = true;

    interval = setInterval(() => {
        if (timerMode) {
            remaining -= 10;
            if (remaining <= 0) {
                remaining = 0;
                stop();
                if (config.alarmeAtivado) alert("Tempo encerrado!");
            }
        } else {
            elapsed += 10;
        }
        atualizarDisplay();
    }, 10);
}

function stop() {
    running = false;
    clearInterval(interval);
}

function reset() {
    stop();
    elapsed = 0;
    remaining = 0;
    atualizarDisplay();
}

// Eventos
btnPlay.onclick = () => running ? stop() : start();
btnReset.onclick = reset;

radioCron.onclick = () => { timerMode = false; reset(); };
radioTimer.onclick = () => { timerMode = true; reset(); };

btn30.onclick = () => { remaining += 30000; atualizarDisplay(); };
btn60.onclick = () => { remaining += 60000; atualizarDisplay(); };
btn300.onclick = () => { remaining += 300000; atualizarDisplay(); };

temaClaro.onclick = () => { config.tema = "claro"; salvar(); };
temaEscuro.onclick = () => { config.tema = "escuro"; salvar(); };
checkMs.onchange = () => { config.mostrarMilissegundos = checkMs.checked; salvar(); };
checkAlarm.onchange = () => { config.alarmeAtivado = checkAlarm.checked; salvar(); };

function salvar() {
    localStorage.setItem("hourglass_config", JSON.stringify(config));
    aplicarTema();
}
