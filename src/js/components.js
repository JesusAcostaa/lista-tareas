// Manipulación de DOM
// console.log('hola',tarea);

import { listaTareas } from "..";
import {
  eliminarTarea,
  marcarTareaCompletada,
  mostraTareas,
} from "./functions";
import { Tarea } from "../classes/tarea";
import { Tareas } from "../classes/lista-tareas";

export const ACCIONES = {
  input: (idTarea) => marcarTareaCompletada(idTarea),
  button: (idTarea) => eliminarTarea(idTarea),
};

const infoTarea = document.querySelector(".new-todo");
const ulTareas = document.querySelector(".todo-list");
const filtro = document.querySelector(".filters");
const eliminarCompletados = document.querySelector(".clear-completed");
const padrePendientes = document.querySelector(".todo-count");
const totalPendientes = padrePendientes.children[0];

// TODO: Evento agregar nueva tarea
infoTarea.addEventListener("keyup", ($event) => {
  if ($event.key !== "Enter") return;
  const valorTarea = $event.target.value;
  const tarea = new Tarea(valorTarea);

  infoTarea.value = "";

  listaTareas.addTarea(tarea);
  mostraTareas(); // TODO: realizar instancia clase tarea y pasas el valor
  totalPendientes.textContent = `${listaTareas.totalPendientes()}`
});

// TODO: Evento para completar y eliminar tarea
ulTareas.addEventListener("click", ($event) => {
  const tipoElemento = $event.target.localName;
  const tarea = $event.target.parentElement.parentElement;
  const idTarea = tarea.getAttribute("data-id");

  if (tipoElemento === "label") return;

  ACCIONES[tipoElemento](idTarea);
  tarea.classList.toggle("completed");
  totalPendientes.textContent = `${listaTareas.totalPendientes()}`
});

const FUNCIONES = {
  pendientes: (arrayLis) => {
    for (const iterator of arrayLis) {
      const claseIterator = iterator.getAttribute("class");
      if (claseIterator === "hidden") {
        iterator.classList.remove("hidden");
      }else if(claseIterator === "completed"){
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
      if (claseIterator === "completed hidden") {
        iterator.classList.remove("hidden");
      }else if(claseIterator !== "completed"){
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

//TODO: Evento para eliminar las tareas completadas:
eliminarCompletados.addEventListener("click", ($event) => {
  listaTareas.eliminarTareasCompletadas();
  mostraTareas();
})

