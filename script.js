// Configuração padrão
const defaultConfig = {
  tema: "claro",
  mostrarMilissegundos: true,
  alarmeAtivado: true,
  tamanhoInterface: "padrao",
};

// Carregar config
let config;
let salva = localStorage.getItem("hourglass_config");

if (salva) {
  config = JSON.parse(salva);
} else {
  config = defaultConfig;
  localStorage.setItem("hourglass_config", JSON.stringify(config));
}

// Timer padrão ao apertar iniciar no modo TIMER
const DEFAULT_TIMER_ON_START = 60000; // 1 minuto

// Elementos
const display = document.getElementById("display");
const btnPlay = document.getElementById("btnPlay");
const btnReset = document.getElementById("btnReset");
const radioCron = document.getElementById("modoCron");
const radioTimer = document.getElementById("modoTimer");

const btn30 = document.getElementById("add30");
const btn60 = document.getElementById("add60");
const btn300 = document.getElementById("add300");

const presetsContainer = document.querySelector(".presets");

// Configurações
const temaClaro = document.getElementById("temaClaro");
const temaEscuro = document.getElementById("temaEscuro");

const checkboxMs = document.getElementById("mostrarMs");
const checkboxAlarme = document.getElementById("ativarAlarme");
const selectSize = document.getElementById("tamanhoInterface");

// Salvar
function salvar() {
  localStorage.setItem("hourglass_config", JSON.stringify(config));
  aplicarTema();
  aplicarTamanhoInterface();
}

// Aplicar Tema
function aplicarTema() {
  document.body.classList.remove("dark", "light");
  const classe = config.tema === "escuro" ? "dark" : "light";
  document.body.classList.add(classe);
}

// Aplicar Tamanho
function aplicarTamanhoInterface() {
  document.body.classList.remove("padrao", "grande");
  document.body.classList.add(config.tamanhoInterface);
}

// Display
function atualizarDisplay() {
  if (!display) return;
  let t = timerMode ? remaining : elapsed;
  if (t < 0) t = 0;

  let m = Math.floor(t / 60000);
  let s = Math.floor((t % 60000) / 1000);
  let ms = Math.floor((t % 1000) / 10);

  const csStr = String(ms).padStart(2, "0");

  display.textContent = config.mostrarMilissegundos
    ? `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${csStr}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Timer
let running = false;
let timerMode = false;
let elapsed = 0;
let remaining = 0;
let interval = null;

function start() {
  if (running) return;
  running = true;

  if (timerMode) {
    if (remaining <= 0) remaining = DEFAULT_TIMER_ON_START;

    interval = setInterval(() => {
      remaining -= 10;
      if (remaining <= 0) {
        remaining = 0;
        stop();
        atualizarDisplay();
        if (config.alarmeAtivado) alert("Tempo encerrado!");
        return;
      }
      atualizarDisplay();
    }, 10);
  } else {
    interval = setInterval(() => {
      elapsed += 10;
      atualizarDisplay();
    }, 10);
  }

  atualizarDisplay();
}

function stop() {
  if (!running) return;
  running = false;
  clearInterval(interval);
  interval = null;
}

function reset() {
  stop();
  elapsed = 0;
  remaining = 0;
  atualizarDisplay();
}

// Presents
function atualizarPresets() {
  if (radioTimer && radioTimer.checked) {
    presetsContainer?.classList.remove("hidden");
    timerMode = true;
  } else {
    presetsContainer?.classList.add("hidden");
    timerMode = false;
  }

  stop();
  atualizarDisplay();
}

// Eventos
if (btnPlay)
  btnPlay.addEventListener("click", () => (running ? stop() : start()));
if (btnReset) btnReset.addEventListener("click", reset);

if (radioCron) radioCron.addEventListener("change", atualizarPresets);
if (radioTimer) radioTimer.addEventListener("change", atualizarPresets);

if (btn30)
  btn30.addEventListener("click", () => {
    remaining += 30000;
    atualizarDisplay();
  });
if (btn60)
  btn60.addEventListener("click", () => {
    remaining += 60000;
    atualizarDisplay();
  });
if (btn300)
  btn300.addEventListener("click", () => {
    remaining += 300000;
    atualizarDisplay();
  });

// Tema
if (temaClaro) temaClaro.checked = config.tema === "claro";
if (temaEscuro) temaEscuro.checked = config.tema === "escuro";

temaClaro?.addEventListener("change", () => {
  config.tema = "claro";
  salvar();
});
temaEscuro?.addEventListener("change", () => {
  config.tema = "escuro";
  salvar();
});

// Mostrar milissegundos
if (checkboxMs) checkboxMs.checked = config.mostrarMilissegundos;
checkboxMs?.addEventListener("change", () => {
  config.mostrarMilissegundos = checkboxMs.checked;
  salvar();
});

// Alarme
if (checkboxAlarme) checkboxAlarme.checked = config.alarmeAtivado;
checkboxAlarme?.addEventListener("change", () => {
  config.alarmeAtivado = checkboxAlarme.checked;
  salvar();
});

// Tamanho interface
if (selectSize) selectSize.value = config.tamanhoInterface;
selectSize?.addEventListener("change", () => {
  config.tamanhoInterface = selectSize.value;
  salvar();
});

// Inicialização
aplicarTema();
aplicarTamanhoInterface();
atualizarPresets();
atualizarDisplay();
