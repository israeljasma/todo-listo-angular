import { Injectable } from '@angular/core';
import { Tarea } from './tarea';
import { Observable, of, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  domainTareas = "http://localhost:8000/tareas/";
  domainEstados = "http://localhost:8000/estados/";
  push;

  constructor(private httpClient: HttpClient) { }

  // tareas: Array<Tarea> = [
  //   new Tarea(1, 'Comprar leche', 'Y pañales para el bebe')
  //   , new Tarea(2, 'Hacer Taller Angular', 'Falta empezar...')
  //   , new Tarea(3, 'Preparar papers', 'Por fin')
  // ];

  getTareas(): Observable<any>{
    return this.httpClient.get<Array<any>>(this.domainTareas);
  }

  getEstados(): Observable<any>{
    return this.httpClient.get<Array<any>>(this.domainEstados);
  }
  crearTarea(t: Tarea): Observable<any> {
    location.reload();
    return this.httpClient.post<Tarea>(this.domainTareas, t);
  }

// crearTarea(t: Tarea): Observable<any> {
//     // Obtener maximo id en this.tareas e incrementar en 1 para el nuevo id
//     const newId = Math.max.apply(null, this.tareas.map(x => x.id)) + 1;
//     // Insertar en el 'backend' la nueva tarea con el id generado y sus atributos
//     this.tareas.push(new Tarea(newId, t.titulo, t.descripcion));
//     // Se retorna un observable vacío solamente para seguir usando observables
//     return empty();
//   }

}
