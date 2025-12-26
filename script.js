// --- SEGURIDAD Y PROTECCIÓN ---
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
    if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); return false; }
});
document.addEventListener('copy', function(e) { e.preventDefault(); });

// --- DATOS ---
const officeTools = [
    { value: "Excel", text: "Excel (Avanzado)" }, { value: "Word", text: "Word & PowerPoint" },
    { value: "Access", text: "Access (Bases de Datos)" }, { value: "Outlook", text: "Outlook (Automatización)" },
    { value: "Forms", text: "Forms (Encuestas)" }, { value: "Loop", text: "Loop (Colaboración)" }
];
const msAdvancedTools = [
    { value: "PowerBI", text: "Power BI & DAX" }, { value: "PowerAutomate", text: "Power Automate" },
    { value: "VBA", text: "VBA (Macros Avanzadas)" }, { value: "Visio", text: "Visio (Diagramación Avanzada)" },
    { value: "Project", text: "Project (Gestión Profesional)" }, { value: "VSCode", text: "Visual Studio Code (Entorno Microsoft)" }
];
const openSourceTools = [
    { value: "Python", text: "Python & Análisis de Datos" }, { value: "C++", text: "C++ (Desarrollo de Sistemas)" },
    { value: "PHP", text: "PHP (Desarrollo Web)" }, { value: "Arduino", text: "Arduino & Integración IoT" },
    { value: "Unity", text: "Unity (Motor de Videojuegos)" }, { value: "Matlab", text: "Matlab (Cálculo Numérico)" },
    { value: "Eclipse", text: "Eclipse / IntelliJ (IDE Java)" }
];

// --- SELECTORES ---
const form = document.getElementById('enrollmentForm');
const mainContainer = document.getElementById('mainContainer');
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

let isRegistrationClosed = false;

function updateFullEmail() { 
    if (emailPrefix && emailDomain && fullEmail) fullEmail.value = emailPrefix.value + emailDomain.value; 
}
emailPrefix.addEventListener('input', updateFullEmail);
emailDomain.addEventListener('change', updateFullEmail);

function updateTools() {
    if (isRegistrationClosed) return;
    const selectedCourse = cursoPrincipal.value;
    let options = [];
    herramientaSelect.innerHTML = '';
    toolsGroup.style.display = 'none';
    if (selectedCourse === 'Productividad') options = officeTools;
    else if (selectedCourse === 'MS_Avanzado') options = msAdvancedTools;
    else if (selectedCourse === 'Open_Source') options = openSourceTools;
    if (options.length > 0) {
        toolsGroup.style.display = 'block';
        options.forEach(tool => {
            const option = document.createElement('option');
            option.value = tool.value; option.textContent = tool.text;
            herramientaSelect.appendChild(option);
        });
    }
}

function checkLearningType() {
    if (isRegistrationClosed) return;
    if (tipoAprendizaje.value === 'Gratuita') {
        learningTypeMessage.textContent = "¡Lo siento, pero para la clase gratuita, te debes de comunicar con el fundador!";
        learningTypeMessage.className = "validation-message error-text";
        submitButton.disabled = true;
    } else {
        learningTypeMessage.textContent = tipoAprendizaje.value === 'Privada' ? "¡Vamos! Envía tu inscripción ahora." : "";
        learningTypeMessage.className = "validation-message success-text";
        submitButton.disabled = false;
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
    if (value.length <= 5) return true;
    if (!phonePattern.test(value)) { phoneError.textContent = "¡Error! Formato XXXX-XXXX."; return false; } 
    phoneError.textContent = ""; return true;
}

function validateDate() {
    const minDate = new Date('2026-06-01T00:00:00');
    const selectedDate = new Date(fechaInicioInput.value);
    if (!fechaInicioInput.value) return true;
    if (selectedDate < minDate) { dateError.textContent = "Mínimo 01/06/2026."; return false; }
    dateError.textContent = ""; return true;
}

function validateForm() {
    if (isRegistrationClosed) return false;
    const canSubmit = validatePhone() && validateDate() && tipoAprendizaje.value !== 'Gratuita' && form.checkValidity();
    submitButton.disabled = !canSubmit;
    return canSubmit;
}

telefonoInput.addEventListener('input', handlePhoneInput);
fechaInicioInput.addEventListener('input', validateForm);

function startCountdown(targetDate, elementId) {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        const element = document.getElementById(elementId);
        if (!element) return;
        if (diff <= 0) {
            element.innerHTML = "FINALIZADO";
            if (elementId === 'countdown-registro') lockFormByTime();
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

// ACTUALIZACIÓN DE BLOQUEO CON ANIMACIÓN FORMAL
function lockFormByTime() {
    if (isRegistrationClosed) return;
    isRegistrationClosed = true;
    mainContainer.classList.add('locked-mode');
    
    submitButton.disabled = true;
    submitButton.textContent = "SISTEMA CERRADO";
    submitButton.style.background = "#7f1d1d";

    // Reemplazo del mensaje por una estructura de aviso formal con animación
    learningTypeMessage.innerHTML = `
        <div class="legal-notice-box">
            <div class="legal-header">
                <span class="lock-icon"></span>
                <h3>PROTOCOLO DE RESTRICCIÓN ACTIVO</h3>
            </div>
            <div class="legal-body">
                <p>Se notifica formalmente que el periodo de inscripción para el <strong>Ciclo Técnico 2026</strong> ha concluido de forma definitiva.</p>
                <p>Por disposición de la administración del <em>Aula Privada Técnica</em>, el sistema ha bloqueado la recepción de nuevos registros para garantizar la integridad del cupo establecido.</p>
                <p class="legal-footer">Cualquier intento de alteración será registrado por el servidor.</p>
            </div>
        </div>
    `;

    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => input.disabled = true);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (isRegistrationClosed) { alert("SISTEMA BLOQUEADO."); return; }
    if (!validateForm()) return;
    submitButton.textContent = "Enviando...";
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
    .then(r => { if (r.ok) { form.reset(); learningTypeMessage.textContent = "✅ ¡Enviado!"; } });
});

window.onload = function() {
    updateTools(); updateFullEmail();
    telefonoInput.value = '+502 ';
    startCountdown('December 25, 2025 20:00:00', 'countdown-registro');
    startCountdown('December 28, 2025 13:00:00', 'countdown-clases');
}
