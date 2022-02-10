import { listaTareas } from "..";

const cajaTarea = document.querySelector(".todo-list");

export function mostraTareas() {
  const arrayTareas = listaTareas.tareas;
  cajaTarea.innerHTML = "";
  arrayTareas.forEach((item) => {
    cajaTarea.innerHTML += `
        <li data-id="${item.id}">
            <div class="view">
                <input class="toggle" type="checkbox">
                <label>${item.tarea}</label>
                <button class="destroy"></button>
            </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;
  });
}

export function marcarTareaCompletada(id) {
  listaTareas.marcarTareaCompletada(id);
}

export function eliminarTarea(id) {
  listaTareas.eliminarTarea(id);
  mostraTareas();
}
