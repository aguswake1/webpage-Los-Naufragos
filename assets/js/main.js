// Var
const btnEmail = document.getElementById("btn-email");
const form = document.getElementById("form");
const inputNombre = document.getElementById("nombre");
const inputTelefono = document.getElementById("telefono");
const inputEmail = document.getElementById("email");
const inputMensaje = document.getElementById("motivo");
const inputs = [inputNombre, inputTelefono, inputEmail, inputMensaje];
const spinner = `<div class="sk-chase">
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                        <div class="sk-chase-dot"></div>
                    </div>`;

form.appendChild(spinner);

// Toast message
function toastMessage(message, state) {
    btnEmail.disabled = true;
    this.popup = document.createElement("div");
    this.popup.className = `toast slideInDown ${state}`;
    document.body.appendChild(this.popup);
    this.popup.textContent = message;

    setTimeout(() => {
        this.popup.classList.remove("slideInDown");
        // this.popup.classList.add("slideOutUp");
        this.popup.remove();
        btnEmail.disabled = false;
    }, 3000);
}

// Validación de form Contacto

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
    mensaje: false,
};

const validarCampos = (ex, input, campo) => {
    if (ex.test(input.value)) {
        input.style.border = "2px solid rgb(23, 168, 16)";
        camposValidos[campo] = true;
    } else {
        input.style.border = "2px solid rgb(172, 29, 29)";
        camposValidos[campo] = false;
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
                e.target.style.border = "2px solid rgb(23, 168, 16)";
                camposValidos.mensaje = true;
                break;
            } else {
                e.target.style.border = "2px solid rgb(172, 29, 29)";
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

function enviarEmail(data) {
    Email.send({
        Host: "smtp.elasticemail.com",
        // Necesita ingresar a la cuenta
        Username: "naufragoslos@gmail.com",
        Password: "",
        // El receptor
        To: "naufragoslos@gmail.com",
        // El remitente
        From: "naufragoslos@gmail.com",
        Subject: "CONTRATACIONES",
        Body: `<div style="border-radius:15px;background-color: #2f58a4a3; color: #fafafa; font-family:Helvetica, Arial, sans-serif; margin-left: auto; margin-right: auto; max-width: 600px; padding-left: 31px; padding-right: 31px; padding-bottom:100px; padding-top:30px; width: 600px" border: solid 5px red;>
        <h2><center>CONTRATACIONES</center></h2>
        <p style="font-size:16px;">
        El nombre de la persona que se intenta contactar es <b>${data[0]}</b>, el telefono es <b>${data[1]}</b> y el email es <b>${data[2]}</b>, dejó el siguiente mensaje:
        </p>
        <p style="font-size:16px;">${data[3]}</p>
    </div>`,
    })
        .then(() => {
            toastMessage("Correo enviado exitosamente.", "success");
        })
        .catch((err) => toastMessage(err, "error"));
}

btnEmail.addEventListener("click", (e) => {
    e.preventDefault();

    if (
        camposValidos.nombre &&
        camposValidos.telefono &&
        camposValidos.email &&
        camposValidos.mensaje
    ) {
        let dataEmail = [];
        inputs.forEach((input) => {
            dataEmail.push(input.value);
        });
        enviarEmail(dataEmail);
        // Ponemos false devuelta a los booleans
        for (const key in camposValidos) {
            camposValidos[key] = false;
        }
        form.reset();

        inputs.forEach((input) => {
            input.style.border = "2px solid #1f53c5";
        });
    } else {
        inputs.forEach((input) => {
            input.style.border = "2px solid #1f53c5";
        });
        toastMessage(
            "Error, revise los datos e intentalo nuevamente.",
            "error"
        );
    }
});
