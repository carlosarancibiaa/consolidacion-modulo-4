
//--------------------------------------------FUNCIONES------------------------------------

async function cargarPersonajes(i, id, tarjeta, color) {
    try {
        let url = "https://swapi.dev/api/people/" + i
        await fetch(url)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                constructora(datos, id, tarjeta, color)
            })
    } catch {
        console.log("error", error)
    }
}
// -------------------------------------------------------------------------------------------------------------
function* generador(i, id, tarjeta, color) {
    while (true) {
        yield cargarPersonajes(i, id, tarjeta, color)
    }
}
// ---------------------------------------------------------------------------------------------------------------

let contador1 = 1
let contador2 = 6
let contador3 = 11

const selector = (id, tarjeta, color) => {
    if (id == 'personajePrincipal') {
        if (contador1 < 6) {
            generador(contador1, id, tarjeta, color).next()
            contador1++
        } else {
            $("div").remove(`.${id}`)
            contador1 = 1
        }
    } else if (id == 'personajeSecundario') {
        if (contador2 < 11) {
            generador(contador2, id, tarjeta, color).next()
            contador2++
        } else {
            $("div").remove(`.${id}`)
            contador2 = 6
        }
    } else if (id == 'otrosPersonajes') {
        if (contador3 < 16) {
            generador(contador3, id, tarjeta, color).next()
            contador3++
        } else {
            $("div").remove(`.${id}`)
            contador3 = 11
        }
    }
}
// -------------------------------------------------------------------------------------------------------------

function constructora(datos, id, tarjeta, color) {
    let personaje = new PersonajeCompleto(datos.name, datos.height, datos.mass, id, tarjeta, color)
    insertarDatos(personaje)
}
// --------------------------------------------------------------------------------------------------------------
function insertarDatos(personaje) {
    $(`#${personaje.tarjeta}`).append(`
    <div class="col-12 col-md-6 col-lg-4 ${personaje.id}">
        <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
            <div class="timeline-icon" style="background-color: ${personaje.color};"><i class="fa fa-address-card" aria-hidden="true"></i>
            </div>
            <div class="timeline-text">
                <h6 style = "font-weight: bold">${personaje.name}</h6>
                <p>Estatura${personaje.height} cm. Peso${personaje.weigth}</p>
            </div>
        </div>
    </div>

    `)
}


// sin .then
//async function cargarPersonajes(i, id, tarjeta, color) {
//     try {
//         let url = "https://swapi.dev/api/people/" + i
//         let response = await fetch(url);
//         let data = await response.json();
//         constructora(data, id, tarjeta, color);
//     } catch (error) {
//         console.log("error", error);
//     }
// }


// ----------------------------------------CLASES--------------------------------------------------------

class Personaje {
    constructor(name, height, weigth) {
        this.name = name
        this.height = height
        this.weigth = weigth
    }
}
// --------------------------------------------------------------------------------------------------------------

class PersonajeCompleto extends Personaje {
    constructor(name, height, weigth, id, tarjeta, color) {
        super(name, height, weigth);
        this.id = id;
        this.tarjeta = tarjeta;
        this.color = color;
    }
}