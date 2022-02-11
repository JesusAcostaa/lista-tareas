export class Tareas {
  constructor() {
    this.tareas = [];
  }

  addTarea(tarea) {
    this.tareas = [...this.tareas, tarea];
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter((item) => item.id !== Number(id));
    console.log(this.tareas);
  }

  marcarTareaCompletada(id) {
    const tareaAMarcar = this.tareas.find((item) => item.id === Number(id));
    tareaAMarcar.completed = !tareaAMarcar.completed;
  }
  eliminarTareasCompletadas() {
    this.tareas = this.tareas.filter((item) => item.completed != true);
  }

  totalPendientes() {
    let contador = 0;
    this.tareas.forEach((item) => {
      if (item.completed === false) {
        contador++;
      }
    });
    console.log(contador);
    return contador;
  }
}
