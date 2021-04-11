document.addEventListener("DOMContentLoaded", () => {
    // Animación de desplazamiento a Sobre Nosotros
    $(".linkNosotros").click(function (e) {
        e.preventDefault();
        const codigo = "#" + $(this).data("ancla");
        $("html,body").animate(
            {
                scrollTop: $(codigo).offset().top,
            },
            800
        );
    });

    // Animación de desplazamiento a la sección Contacto
    $(".linkContacto").click(function (e) {
        e.preventDefault();
        const codigo = "#" + $(this).data("ancla");
        $("html,body").animate(
            {
                scrollTop: $(codigo).offset().top,
            },
            800
        );
    });

    // Validación de form Contacto
    const btnEmail = document.getElementById("btn-email");
    const form = document.getElementsByClassName("form");
    const inputNombre = document.getElementById("nombre");
    const inputTelefono = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const inputMensaje = document.getElementById("motivo");
    const inputs = [inputNombre, inputTelefono, inputEmail, inputMensaje];

    // Expresiones Regulares
    const er = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        telefono: /^\d{7,14}$/,
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };

    const camposValidos = {
        nombre: false,
        telefono: false,
        email: false,
        mensaje:false
    };

    const validarCampos = (ex, input, campo) => {
        if (ex.test(input.value)) {
            input.classList.remove("valFallida");
            input.classList.add("valExitosa");
            camposValidos.campo = true;
        } else {
            input.classList.remove("valExitosa");
            input.classList.add("valFallida");
            camposValidos.campo = false;
        }
    };

    const validarForm = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampos(er.nombre, e.target, e.target.name);
                break;

            case "telefono":
                validarCampos(er.telefono, e.target, e.target.name);
                break;

            case "email":
                validarCampos(er.email, e.target, e.target.name);
                break;

            case "mensaje":
                if (e.target.value.length > 0) {
                    e.target.classList.remove("valFallida");
                    e.target.classList.add("valExitosa");
                    camposValidos.mensaje = true;
                    break;

                }else{
                    e.target.classList.remove("valExitosa");
                    e.target.classList.add("valFallida");
                    camposValidos.mensaje = false;
                    break;
                }
        }
    };

    /* eventos que validan */
    inputs.forEach((input) => {
        input.addEventListener("keyup", validarForm);
        input.addEventListener("blur", validarForm);
    });

    // Enviar Mail por SMTP
    btnEmail.addEventListener("submit", (e) => {
        e.preventDefault();
        if (camposValidos.nombre && camposValidos.telefono && camposValidos.email && camposValidos.mensaje) {
            let dataEmail = [];

            inputs.forEach(input => {
                dataEmail.push(input.value);
            });

            form.reset();
            enviarEmail(dataEmail);

        }
    });

    function enviarEmail(data){
        Email.send({
            Host:"smtp.gmail.com",
            // Necesita ingresar a la cuenta
            Username:"naufragoslos@gmail.com",
            Password:"",
            // El receptor
            To:"naufragoslos@gmail.com",
            // El remitente
            From:"naufragoslos@gmail.com",
            Subject:"test",
            Body:`nombre: ${data[0]} <br> telefono: ${data[1]} <br> email: ${data[2]} <br> mensaje: ${data[3]}`,}).then((data) => alert("enviado"));
    }
});


