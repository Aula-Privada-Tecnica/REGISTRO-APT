document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }

    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }

    if ((e.key === 's' || e.key === 'S') && (e.ctrlKey || e.metaKey)) { 
        e.preventDefault();
        return false;
    }
});

document.addEventListener('copy', function(e) {
    console.log("¡Copiado de contenido bloqueado!");
    e.preventDefault();
});

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


function updateFullEmail() {
    fullEmail.value = emailPrefix.value + emailDomain.value;
}

emailPrefix.addEventListener('input', updateFullEmail);
emailDomain.addEventListener('change', updateFullEmail);


function updateTools() {
    const selectedCourse = cursoPrincipal.value;
    let options = [];

    herramientaSelect.innerHTML = '';
    toolsGroup.style.display = 'none';

    if (selectedCourse === 'Productividad') {
        options = officeTools;
        toolsGroup.style.display = 'block';
    } else if (selectedCourse === 'MS_Avanzado') {
        options = msAdvancedTools;
        toolsGroup.style.display = 'block';
    } else if (selectedCourse === 'Open_Source') {
        options = openSourceTools;
        toolsGroup.style.display = 'block';
    }

    if (options.length > 0) {
        options.forEach(tool => {
            const option = document.createElement('option');
            option.value = tool.value;
            option.textContent = tool.text;
            herramientaSelect.appendChild(option);
        });
        herramientaSelect.value = options[0].value;
    } else {
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "-- Selecciona la Herramienta --";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        herramientaSelect.appendChild(defaultOption);
    }
}

function checkLearningType() {
    if (tipoAprendizaje.value === 'Gratuita') {
        learningTypeMessage.textContent = "¡Lo siento, pero para la clase gratuita, te debes de comunicar con el fundador!";
        learningTypeMessage.classList.add('error-text');
        learningTypeMessage.classList.remove('success-text');
        submitButton.disabled = true;
        submitButton.textContent = "Contáctame para tu clase gratuita";
    } else if (tipoAprendizaje.value === 'Privada') {
        learningTypeMessage.textContent = "¡Vamos! Envía tu inscripción ahora.";
        learningTypeMessage.classList.add('success-text');
        learningTypeMessage.classList.remove('error-text');
        submitButton.disabled = false;
        submitButton.textContent = "Enviar mi inscripción";
    } else {
        learningTypeMessage.textContent = "";
        submitButton.disabled = false;
        submitButton.textContent = "Inscribirme Ahora";
    }
    validateForm(); 
}

function handlePhoneInput() {
    let value = telefonoInput.value;
    
    let digits = value.replace(/\D/g, ''); 
    
    if (digits.startsWith('502')) {
        digits = digits.substring(3);
    }

    if (digits.length > 8) {
        digits = digits.substring(0, 8);
    }
    
    let formattedDigits = digits;
    if (digits.length > 4) {
        formattedDigits = digits.substring(0, 4) + '-' + digits.substring(4);
    }
    
    telefonoInput.value = '+502 ' + formattedDigits;

    validatePhone();
}

function validatePhone() {
    const phonePattern = /^\+502\s[0-9]{4}-[0-9]{4}$/; 
    const value = telefonoInput.value.trim();
    
    if (value.length <= 5) { 
        phoneError.textContent = "";
        return true; 
    } 
    
    if (!phonePattern.test(value)) {
        phoneError.textContent = "¡Error de Navegación! El número debe tener 8 dígitos en formato XXXX-XXXX.";
        return false;
    } 
    
    phoneError.textContent = "";
    return true;
}

telefonoInput.addEventListener('input', handlePhoneInput);
telefonoInput.addEventListener('focus', function() {
    if (!telefonoInput.value.startsWith('+502')) {
        telefonoInput.value = '+502 ';
    }
});


function validateDate() {
    const minDate = new Date('2026-06-01T00:00:00');
    const selectedDate = new Date(fechaInicioInput.value);

    if (!fechaInicioInput.value) {
        dateError.textContent = "";
        return true;
    } else if (selectedDate < minDate) {
        dateError.textContent = "Fecha fuera de la Ventana de Lanzamiento. Debe ser 01/06/2026 o posterior.";
        return false;
    } else {
        dateError.textContent = "";
        return true;
    }
}

fechaInicioInput.addEventListener('change', validateDate);
fechaInicioInput.addEventListener('input', validateDate);

function validateForm() {
    const isPhoneValid = validatePhone();
    const isDateValid = validateDate();
    const isLearningTypeValid = tipoAprendizaje.value !== 'Gratuita';

    const canSubmit = isPhoneValid && isDateValid && isLearningTypeValid && form.checkValidity();
    
    if (tipoAprendizaje.value === 'Gratuita') {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = !canSubmit;
    }

    return canSubmit;
}

function resetForm() {
    form.reset(); 
    updateTools(); 
    checkLearningType(); 
    updateFullEmail(); 
    telefonoInput.value = '+502 ';
}

function showTempSuccessMessage(duration = 5000) {
    const originalText = "¡Vamos! Envía tu inscripción ahora."; 

    learningTypeMessage.textContent = "✅ ¡Inscripción enviada con éxito!";
    learningTypeMessage.classList.add('success-text');
    learningTypeMessage.classList.remove('error-text');

    submitButton.disabled = true;
    submitButton.textContent = "¡Enviado!";

    setTimeout(() => {
        if (tipoAprendizaje.value === 'Privada') {
            learningTypeMessage.textContent = originalText;
            learningTypeMessage.classList.add('success-text');
            learningTypeMessage.classList.remove('error-text');
            submitButton.disabled = false;
            submitButton.textContent = "Enviar mi inscripción";
        } else {
             checkLearningType();
        }
    }, duration);
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    updateFullEmail(); 
    
    if (!validateForm()) {
        document.getElementById('learningTypeMessage').textContent = "Por favor, resuelve todos los fallos de validación antes de continuar con la inscripción.";
        document.getElementById('learningTypeMessage').classList.add('error-text');
        document.getElementById('learningTypeMessage').classList.remove('success-text');
        return false;
    }
    
    const endpoint = form.action; 
    const formData = new FormData(form);

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    fetch(endpoint, {
        method: 'POST', 
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            resetForm(); 
            showTempSuccessMessage(5000); 
        } else {
            throw new Error('El servidor de Formspree devolvió un error (ej. límite de envío).');
        }
    })
    .catch(error => {
        console.error('Error durante el envío del formulario:', error);
        
        resetForm(); 
        showTempSuccessMessage(5000); 
    });
});


window.onload = function() {
    updateTools();
    checkLearningType();
    updateFullEmail();

    fechaInicioInput.min = "2026-06-01";
    
    telefonoInput.value = '+502 ';
}
