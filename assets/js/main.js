$(document).ready(function () {
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
    const inputNombre = document.getElementById("nombre");
    const inputTelefono = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const inputMensaje = document.getElementById("motivo");
    const btnEmail = document.getElementById("btn-email");
    const inputs = [inputNombre, inputTelefono, inputMensaje, inputEmail];
    let contExito = false;

    // inputNombre.addEventListener("blur", (e) => {
    //     // si la cant de caracteres es mayor a 0
    //     if (e.target.value.length > 0) {
    //         inputNombre.classList.remove("valFallida");
    //         inputNombre.classList.add("valExitosa");

    //     } else {
    //         inputNombre.classList.remove("valExitosa");
    //         inputNombre.classList.add("valFallida");
    //     }
    // });

    // inputTelefono.addEventListener("blur", (e) => {
    //     // si la cant de caracteres es mayor a 0
    //     if (e.target.value.length > 0) {
    //         inputTelefono.classList.remove("valFallida");
    //         inputTelefono.classList.add("valExitosa");

    //     } else {
    //         inputTelefono.classList.remove("valExitosa");
    //         inputTelefono.classList.add("valFallida");
    //     }
    // });

    // inputEmail.addEventListener("blur", (e) => {
    //     // si la cant de caracteres es mayor a 0
    //     if (e.target.value.length > 0) {
    //         inputEmail.classList.remove("valFallida");
    //         inputEmail.classList.add("valExitosa");

    //     } else {
    //         inputEmail.classList.remove("valExitosa");
    //         inputEmail.classList.add("valFallida");
    //     }
    // });

    // inputMensaje.addEventListener("blur", (e) => {
    //     // si la cant de caracteres es mayor a 0
    //     if (e.target.value.length > 0) {
    //         inputMensaje.classList.remove("valFallida");
    //         inputMensaje.classList.add("valExitosa");

    //     } else {
    //         inputMensaje.classList.remove("valExitosa");
    //         inputMensaje.classList.add("valFallida");
    //     }
    // });

    function validar(e) {
        const input = e.path[0];
        // expresion regular
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (e.target.type === "email") {
            er.test(e.target.value);
        }
        console.log(e.target.type);
        if (e.target.value.length > 0) {
            input.classList.remove("valFallida");
            input.classList.add("valExitosa");
        } else {
            input.classList.remove("valExitosa");
            input.classList.add("valFallida");
        }
    }

    // inputs.forEach((input) => {
    //     input.addEventListener("blur", (e) => {
    //         // se valida
    //         validar(e);
    //         // se activa el boton
    //         if (input.classList.contains("valExitosa")) {
    //             contExito++;
    //             console.log(contExito);
    //             if (contExito === inputs.length) {
    //                 btnEmail.removeAttribute("disabled");
    //                 contExito = 0;
    //             }
    //         } else if (input.classList.contains("valFallida") && contExito > 0){
    //             contExito--;
    //             btnEmail.setAttribute("disabled","");
    //         }
    //     });
    // });

    inputs.forEach((input) => {
        input.addEventListener("blur", (e) => {
            // se valida
            validar(e);
        });
    });

    inputs.forEach((input) => {
        input.addEventListener("blur", (e) => {
            // se activa el boton
            console.log(contExito);
            if (input.classList.contains("valExitosa")) {
                contExito++;
                console.log(contExito);
                if (contExito === inputs.length) {
                    btnEmail.removeAttribute("disabled");
                    contExito = 0;
                }
            } else if (input.classList.contains("valFallida")){
                if (contExito = 0) {
                    
                }
                contExito--;
                console.log(contExito);

            }
        });
    });


});
