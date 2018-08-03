import { Component, OnInit } from '@angular/core';
import { Tarea, EstadoTarea } from './tarea';
import { TareaService } from './tarea.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Todo Listo!';
  estadoTareas = EstadoTarea;
  tareaSeleccionada: Tarea;
  tareas: any;
  newTarea: Tarea;
  estadosTareas: any;
  domain: string = 'http://127.0.0.1:8000';

  constructor(public tareaService: TareaService, private httpClient: HttpClient) {
    this.tareas = [];
    this.newTarea = new Tarea(null, null, null, null);
  }

  ngOnInit() {
    // this.tareaService.getTareas()
    //     .subscribe((ts: Array<Tarea>) => {
    //       this.tareas = ts;
    //     });
    this.getTareas();
    this.getEstados();
  }

  getTareas() {
    this.httpClient.get(`${this.domain}/tareas/`).subscribe(data => {
      this.tareas = data;
    });
  }

  getEstados() {
    this.httpClient.get(`${this.domain}/estados/`).subscribe(data => {
      this.estadosTareas = data;
    });
  }

  actualizarTarea(t: Tarea) {
    console.log(`La tarea ${t} fue actualizada!`);
  }

  seleccionarTarea(t: Tarea) {
    this.tareaSeleccionada = t;
  }

  crearTarea() {
    this.httpClient.post(`${this.domain}/tareas/`, this.newTarea).subscribe(data => {
    });
    location.reload();
  }

  estado2str(e: EstadoTarea) {
    switch (e) {
      case EstadoTarea.Creada: return 'Creada';
      case EstadoTarea.EnProceso: return 'En Proceso';
      case EstadoTarea.Terminada: return 'Terminada';
    }
  }

}































/*
export class AppComponent implements OnInit {
  title = 'Todo Listo!';
  estadoTareas = EstadoTarea;
  tareaSeleccionada: Tarea;
  tareas: Array<Tarea>;
  newTarea: ITarea;
  estado2str = estado2str;

  constructor(private tareaService: TareaService) {
    this.tareas = [];
    this.newTarea = {
      titulo: '',
      descripcion: ''
    };
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.tareaService.getTareas()
        .subscribe(tareas => {
          this.tareas = tareas;
        });
  }

  seleccionarTarea(t: Tarea) {
    this.tareaSeleccionada = t;
  }

  crearTarea() {
    console.log(this.newTarea);
    // TODO: Add loading controller
    this.tareaService.crearTarea(this.newTarea);
  }

  guardarTarea(t: Tarea) {
    console.log(`Guardando tarea: ${t}`);
  }
}
*/