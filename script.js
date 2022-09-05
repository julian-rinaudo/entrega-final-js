const btn = document.querySelectorAll("button.button");
const input = document.querySelector("#input");
const titulo = document.querySelector("#titulo");
const bienvenida = document.querySelector("#contenedor");
const saludo = document.querySelector("#saludo");
const app = document.querySelector("#app");
const btnAgregar = document.querySelector("#btnPlus");
const inputIngresar = document.querySelector("#ingresar-tarea");
const marca = document.querySelector("#marca");
const ul = document.querySelector("#tareas");
const btnAndInput = document.querySelector("#inputButtom");
const svg = document.querySelector("#svg");
const texto = document.querySelector("#text")

let id = 0;
let lista = [];

/*Funciones */
const IngresarNombre = () =>{
    btn.forEach((boton) => {
        boton.addEventListener("click", () => {
            const nombre = input.value;
            

            if (nombre != "") {
                titulo.innerText = `Hola ${nombre}`;
                bienvenida.style.display = "none";
                marca.style.display = "none"
                svg.style.display ="none"
                btnAndInput.style.display = "none"
                saludo.style.display = "block";
                app.style.display = "block";
                input.value = "";
            }
        });
    });
}

const agregarTarea = (tarea, id) => {
    const li = document.createElement("li");
    li.classList.add("tareas");
    const p = document.createElement("p");
    p.classList.add("text");
    p.textContent = tarea;
    const icono = document.createElement("i");
    icono.classList.add("fas", "fa-trash", "de", "btn-delete");
    icono.setAttribute("data", "eliminado");
    icono.setAttribute("id", id);
    texto.textContent = "";
   

    li.appendChild(p);
    li.appendChild(icono);
    ul.appendChild(li);
    
    realizado(li);
    
}

const realizado = li => {
    li.addEventListener("click", () => {
        li.classList.toggle("check")
    })
}

const btnEliminar = element => {
    element.parentNode.parentNode.removeChild(element.parentNode);

    //Operador Ternario
    lista.length === 0 ? popUp() : "";
    lista.length === 0 ? texto.textContent="Sin tareas pendientes" : "";
    //Operador Ternario
}

const cargarLista = lista => {
    lista.forEach(e => {
        agregarTarea(e.nombre, e.id);
    })
    

}

const popUp = () => {
    
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Felicitaciones",
        html: `<p>No tienes tareas pendientes</p>`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });
}
/*Funciones */

/*Eventos */
btnAgregar.addEventListener("click", () => {
    const tarea = inputIngresar.value;
    if (tarea) {
        agregarTarea(tarea, id)
        lista.push({
            nombre: tarea,
            id: id
        })
    }
    localStorage.setItem("tareas", JSON.stringify(lista));
    inputIngresar.value = ""
    id++
    
    
        
});

addEventListener("keyup", event => {
    if (event.key == "Enter") {
        const tarea = inputIngresar.value;
        if (tarea) {
            agregarTarea(tarea, id);
            lista.push({
                nombre: tarea,
                id: id,
            });
        }
        localStorage.setItem("tareas", JSON.stringify(lista));
        inputIngresar.value = "";
        id++
        
    }
    
})

ul.addEventListener("click", e => {
    
    const element = e.target;
    const elementData = element.attributes.data?.value

    lista = lista.filter(element =>element.id != e.target.id)

    if (elementData === "eliminado") {
        btnEliminar(element);
    }
    localStorage.setItem("tareas", JSON.stringify(lista));
})
/*Eventos */


const datos = localStorage.getItem("tareas")
if (datos) {
    lista = JSON.parse(datos)
    cargarLista(lista)
} 



IngresarNombre();
