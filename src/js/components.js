// Manipulación de DOM
// console.log('hola',tarea);

import { listaTareas } from "..";
import {
  eliminarTarea,
  marcarTareaCompletada,
  mostraTareas,
} from "./functions";
import { Tarea } from "../classes/tarea";

export const ACCIONES = {
  input: (idTarea) => marcarTareaCompletada(idTarea),
  button: (idTarea) => eliminarTarea(idTarea),
};

const infoTarea = document.querySelector(".new-todo");
const ulTareas = document.querySelector(".todo-list");
const filtro = document.querySelector(".filters");

// TODO: Evento agregar nueva tarea
infoTarea.addEventListener("keyup", ($event) => {
  if ($event.key !== "Enter") return;
  const valorTarea = $event.target.value;
  const tarea = new Tarea(valorTarea);

  infoTarea.value = "";

  listaTareas.addTarea(tarea);
  mostraTareas(); // TODO: realizar instancia clase tarea y pasas el valor
});

// TODO: Evento para completar y eliminar tarea
ulTareas.addEventListener("click", ($event) => {
  const tipoElemento = $event.target.localName;
  const tarea = $event.target.parentElement.parentElement;
  const idTarea = tarea.getAttribute("data-id");

  if (tipoElemento === "label") return;

  ACCIONES[tipoElemento](idTarea);
  tarea.classList.toggle("completed");
});

const FUNCIONES = {
  pendientes: (arrayLis) => {
    for (const iterator of arrayLis) {
      const claseIterator = iterator.getAttribute("class");
      if (claseIterator === "completed") {
        iterator.classList.add("hidden");
      }
    }
  },

  todos: (arrayLis) => {
    for (const iterator of arrayLis) {
      if (iterator.classList.contains("hidden")) {
        iterator.classList.remove("hidden");
      }
    }
  },
  completados: (arrayLis) => {
    for (const iterator of arrayLis) {
      const claseIterator = iterator.getAttribute("class");
      if (claseIterator !== "completed") {
        iterator.classList.add("hidden");
      }
    }
  }
};

//TODO: Evento para listar la lista de tareas pendientes:
filtro.addEventListener("click", ($event) => {
  const tipoLi = $event.target.textContent.toLowerCase();
  const arrayLis = ulTareas.children;

  FUNCIONES[tipoLi](arrayLis);
});
