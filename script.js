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

        function validatePhone() {
            const phonePattern = /^\+502\s?[0-9]{8}$/; 
            const value = telefonoInput.value.trim();

            if (value === "") {
                phoneError.textContent = "";
                return true;
            } else if (!phonePattern.test(value)) {
                phoneError.textContent = "¡Error de Navegación! Sólo se permite el código de país de Guatemala (+502).";
                return false;
            } else {
                phoneError.textContent = "";
                return true;
            }
        }
        
        telefonoInput.addEventListener('input', validatePhone);

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

        form.addEventListener('submit', function(event) {

            updateFullEmail(); 
            
            if (!validateForm()) {

                event.preventDefault();

                document.getElementById('learningTypeMessage').textContent = "Por favor, resuelve todos los fallos de validación antes de continuar con la inscripción.";
                document.getElementById('learningTypeMessage').classList.add('error-text');
                document.getElementById('learningTypeMessage').classList.remove('success-text');
                return false;
            }
        });


        window.onload = function() {
            updateTools();
            checkLearningType();
            updateFullEmail();

            fechaInicioInput.min = "2026-06-01";
        }

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
});

document.addEventListener('copy', function(e) {
    console.log("¡Copiado de contenido bloqueado!");
    
    e.preventDefault();
});