export class Tarea {
  constructor(tarea) {
    this.tarea = tarea;
    this.id = new Date().getTime();
    this.completed = false;
    this.created = new Date();
  }
}
