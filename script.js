// --- SEGURIDAD Y PROTECCIÓN ---
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
    if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); return false; }
});

document.addEventListener('copy', function(e) { e.preventDefault(); });

// --- DATOS DE HERRAMIENTAS ---
const officeTools = [
    { value: "Excel", text: "Excel (Avanzado)" },
    { value: "Word", text: "Word & PowerPoint" },
    { value: "Access", text: "Access (Bases de Datos)" },
    { value: "Outlook", text: "Outlook (Automatización)" },
    { value: "Forms", text: "Forms (Encuestas)" },
    { value: "Loop", text: "Loop (Colaboración)" }
];

const msAdvancedTools = [
    { value: "PowerBI", text: "Power BI & DAX" },
    { value: "PowerAutomate", text: "Power Automate" },
    { value: "VBA", text: "VBA (Macros Avanzadas)" },
    { value: "Visio", text: "Visio (Diagramación Avanzada)" },
    { value: "Project", text: "Project (Gestión Profesional)" },
    { value: "VSCode", text: "Visual Studio Code (Entorno Microsoft)" }
];

const openSourceTools = [
    { value: "Python", text: "Python & Análisis de Datos" },
    { value: "C++", text: "C++ (Desarrollo de Sistemas)" },
    { value: "PHP", text: "PHP (Desarrollo Web)" },
    { value: "Arduino", text: "Arduino & Integración IoT" },
    { value: "Unity", text: "Unity (Motor de Videojuegos)" },
    { value: "Matlab", text: "Matlab (Cálculo Numérico)" },
    { value: "Eclipse", text: "Eclipse / IntelliJ (IDE Java)" }
];

// --- SELECTORES ---
const form = document.getElementById('enrollmentForm');
const cursoPrincipal = document.getElementById('curso_principal');
const toolsGroup = document.getElementById('toolsGroup');
const herramientaSelect = document.getElementById('herramienta_especifica');
const tipoAprendizaje = document.getElementById('tipo_aprendizaje');
const learningTypeMessage = document.getElementById('learningTypeMessage');
const submitButton = document.getElementById('submitButton');
const telefonoInput = document.getElementById('telefono');
const phoneError = document.getElementById('phoneError');
const fechaInicioInput = document.getElementById('fecha_inicio');
const dateError = document.getElementById('dateError');
const emailPrefix = document.getElementById('email_prefix');
const emailDomain = document.getElementById('email_domain');
const fullEmail = document.getElementById('full_email');

// Variable global para controlar el estado de tiempo
let isRegistrationClosed = false;

// --- FUNCIONES DE EMAIL ---
function updateFullEmail() { fullEmail.value = emailPrefix.value + emailDomain.value; }
emailPrefix.addEventListener('input', updateFullEmail);
emailDomain.addEventListener('change', updateFullEmail);

// --- ACTUALIZACIÓN DE CURSOS ---
function updateTools() {
    const selectedCourse = cursoPrincipal.value;
    let options = [];
    herramientaSelect.innerHTML = '';
    toolsGroup.style.display = 'none';

    if (selectedCourse === 'Productividad') { options = officeTools; toolsGroup.style.display = 'block'; }
    else if (selectedCourse === 'MS_Avanzado') { options = msAdvancedTools; toolsGroup.style.display = 'block'; }
    else if (selectedCourse === 'Open_Source') { options = openSourceTools; toolsGroup.style.display = 'block'; }

    if (options.length > 0) {
        options.forEach(tool => {
            const option = document.createElement('option');
            option.value = tool.value;
            option.textContent = tool.text;
            herramientaSelect.appendChild(option);
        });
        herramientaSelect.value = options[0].value;
    }
}

// --- VALIDACIONES ---
function checkLearningType() {
    if (isRegistrationClosed) return; // Prioridad al cierre por tiempo

    if (tipoAprendizaje.value === 'Gratuita') {
        learningTypeMessage.textContent = "¡Lo siento, pero para la clase gratuita, te debes de comunicar con el fundador!";
        learningTypeMessage.classList.add('error-text');
        learningTypeMessage.classList.remove('success-text');
        submitButton.disabled = true;
        submitButton.textContent = "Contáctame para tu clase gratuita";
    } else {
        learningTypeMessage.textContent = tipoAprendizaje.value === 'Privada' ? "¡Vamos! Envía tu inscripción ahora." : "";
        learningTypeMessage.className = "validation-message success-text";
        submitButton.disabled = false;
        submitButton.textContent = "Enviar mi inscripción";
    }
    validateForm(); 
}

function handlePhoneInput() {
    let digits = telefonoInput.value.replace(/\D/g, ''); 
    if (digits.startsWith('502')) digits = digits.substring(3);
    if (digits.length > 8) digits = digits.substring(0, 8);
    let formatted = digits;
    if (digits.length > 4) formatted = digits.substring(0, 4) + '-' + digits.substring(4);
    telefonoInput.value = '+502 ' + formatted;
    validatePhone();
}

function validatePhone() {
    const phonePattern = /^\+502\s[0-9]{4}-[0-9]{4}$/; 
    const value = telefonoInput.value.trim();
    if (value.length <= 5) { phoneError.textContent = ""; return true; } 
    if (!phonePattern.test(value)) { phoneError.textContent = "¡Error de Navegación! Formato XXXX-XXXX."; return false; } 
    phoneError.textContent = "";
    return true;
}

function validateDate() {
    const minDate = new Date('2026-06-01T00:00:00');
    const selectedDate = new Date(fechaInicioInput.value);
    if (!fechaInicioInput.value) return true;
    if (selectedDate < minDate) { dateError.textContent = "Mínimo 01/06/2026."; return false; }
    dateError.textContent = "";
    return true;
}

function validateForm() {
    if (isRegistrationClosed) return false;
    
    const isPhoneValid = validatePhone();
    const isDateValid = validateDate();
    const isLearningTypeValid = tipoAprendizaje.value !== 'Gratuita';
    const canSubmit = isPhoneValid && isDateValid && isLearningTypeValid && form.checkValidity();
    
    submitButton.disabled = !canSubmit;
    return canSubmit;
}

telefonoInput.addEventListener('input', handlePhoneInput);

// --- MANEJO DE ENVÍO ---
function showTempSuccessMessage() {
    learningTypeMessage.textContent = "✅ ¡Inscripción enviada con éxito!";
    learningTypeMessage.className = "validation-message success-text";
    submitButton.disabled = true;
    submitButton.textContent = "¡Enviado!";

    setTimeout(() => {
        if (!isRegistrationClosed) {
            learningTypeMessage.textContent = "";
            submitButton.disabled = false;
            submitButton.textContent = "Enviar mi inscripción";
        }
    }, 5000);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (isRegistrationClosed) {
        alert("El periodo de inscripción ha finalizado.");
        return false;
    }
    if (!validateForm()) return false;
    
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' }})
    .then(response => {
        if (response.ok) { form.reset(); telefonoInput.value = '+502 '; showTempSuccessMessage(); }
    }).catch(() => { showTempSuccessMessage(); });
});

// --- LÓGICA DE CUENTAS REGRESIVAS Y PROHIBICIÓN ---
function startCountdown(targetDate, elementId) {
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        const element = document.getElementById(elementId);

        if (diff <= 0) {
            element.innerHTML = "¡EVENTO INICIADO!";
            // Si el countdown de registro llega a cero, bloqueamos el formulario
            if (elementId === 'countdown-registro') {
                isRegistrationClosed = true;
                lockFormByTime();
            }
            clearInterval(interval);
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        element.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
}

function lockFormByTime() {
    submitButton.disabled = true;
    submitButton.textContent = "Inscripciones Cerradas";
    submitButton.style.backgroundColor = "#ccc"; // Color visual de bloqueo
    learningTypeMessage.textContent = "El tiempo de registro ha expirado. ¡Gracias por tu interés!";
    learningTypeMessage.className = "validation-message error-text";
    
    // Deshabilitar todos los inputs para mayor seguridad visual
    const inputs = form.querySelectorAll('input, select, button');
    inputs.forEach(input => input.disabled = true);
}

// --- CARGA INICIAL ---
window.onload = function() {
    updateTools();
    checkLearningType();
    updateFullEmail();
    telefonoInput.value = '+502 ';
    
    // Configuración de fechas y disparadores de bloqueo
    startCountdown('December 25, 2025 20:00:00', 'countdown-registro');
    startCountdown('December 28, 2025 13:00:00', 'countdown-clases');
}
