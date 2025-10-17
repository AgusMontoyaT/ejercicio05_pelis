import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  ToastController, IonIcon
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, IonIcon
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PeliculasPage {
  private http = inject(HttpClient);
  private toastCtrl = inject(ToastController);

  peliculas: any[] = [];
  peliculaSeleccionada: any = null;
  coleccion: string = 'SHADOW';
  cargando = false;

  cargarShadow() {
    this.cargando = true;
    this.coleccion = 'SHADOW';
    this.http.get('https://imdb.iamidiotareyoutoo.com/search?q=shadow').subscribe(
      (data: any) => {
        this.peliculas = data.description || [];
        this.mostrarMensaje('Colección Shadow cargada');
        this.cargando = false;
      }
    );
  }

  cargarLight() {
    this.cargando = true;
    this.coleccion = 'LIGHT';
    this.http.get('https://imdb.iamidiotareyoutoo.com/search?q=light').subscribe(
      (data: any) => {
        this.peliculas = data.description || [];
        this.mostrarMensaje('Colección Light cargada');
        this.cargando = false;
      }
    );
  }

  async mostrarMensaje(texto: string) {
    const toast = await this.toastCtrl.create({
      message: texto,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  seleccionarPeli(pelicula: any) {
    this.peliculaSeleccionada = pelicula;
  }
}
