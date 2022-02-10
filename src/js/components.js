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

// TODO: Evento agregar nueva tarea
infoTarea.addEventListener("keyup", ($event) => {
  if ($event.key !== "Enter") return;
  const valorTarea = $event.target.value;
  const tarea = new Tarea(valorTarea);

  infoTarea.value = '';

  listaTareas.addTarea(tarea);
  mostraTareas(); // TODO: realizar instancia clase tarea y pasas el valor
});

// TODO: Evento para completar y eliminar tarea
ulTareas.addEventListener("click", ($event) => {
  const tipoElemento = $event.target.localName;

  const tarea = $event.target.parentElement.parentElement;
  const idTarea = tarea.getAttribute("data-id");
  tarea.classList.toggle("completed");

  if (tipoElemento !== "label") ACCIONES[tipoElemento](idTarea);
});
