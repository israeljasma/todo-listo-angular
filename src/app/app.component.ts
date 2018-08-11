import { Component, OnInit } from '@angular/core';
import { Tarea, EstadoTarea } from './tarea';
import { TareaService } from './tarea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent implements OnInit {

  title = 'Todo Listo';
  estadoTareas = EstadoTarea;
  tareaSeleccionada: Tarea;
  tareas: Array<Tarea>;
  newTarea: Tarea;
  estadosTareas: any;
  tareasMostradas: Array<Tarea>;


  filtrarTareas() {
    this.tareasMostradas = this.tareas.filter(t => t.titulo);
    // this.tareasMostradas = this.tareas.filter(t => t.titulo.startsWith('a') );
  }

  constructor(public tareaService: TareaService) {
    this.tareas = [];
    this.newTarea = new Tarea(null, null, null, null);
  }

  ngOnInit() {
    this.tareaService.getTareas()
      .subscribe((ts: Array<Tarea>) => { this.tareas = ts; this.filtrarTareas(); }
      );

    this.getEstados();
  }

  // updateTarea(t: Tarea) {
  //   this.tareaService.updateTarea(t).subscribe(
  //     response => {
  //       ts => {
  //         this.tareaService.push(ts);
  //       }
  //     },
  //     error => console.log('error', error)
  //   );
  // }

  actualizarTarea(t: Tarea) {
  }

  seleccionarTarea(t: Tarea) {
    this.tareaSeleccionada = t;
  }

  deleteTarea(t: Tarea) {
    this.tareaService.deleteTarea(t).subscribe(
      response => {
        ts => {
          this.tareaService.deleteTarea(ts);
        }
      },
      error => console.log('error', error)
    );
  }

  crearTarea() {
    console.log(this.newTarea);
    this.tareaService.crearTarea(this.newTarea).subscribe(
      response => {
        ts => {
          this.tareaService.push(ts);
        }
      },
      error => console.log('error', error)
    );
  }

  getEstados() {
    this.tareaService.getEstados().subscribe(data => {
      this.estadosTareas = data;
    });

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