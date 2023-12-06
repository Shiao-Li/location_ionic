import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FirebaseService } from '../services/firebase.service'; // Ajusta la ruta según la ubicación de tu servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: any = 0;
  longitude: any = 0;

  constructor(
    private geolocation: Geolocation,
    private firebaseService: FirebaseService
  ) {}

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.saveLocation();
    }).catch((error) => {
      console.log('Error, no se puede obtener tu ubicación', error);
    });
  }

  saveLocation() {
    this.firebaseService.guardarUbicacion(this.latitude, this.longitude)
      .then(() => {
        console.log('Ubicación guardada en Firebase');
      })
      .catch(error => {
        console.error('Error al guardar la ubicación en Firebase:', error);
      });
  }

  getGoogleMapsUrl(): string {
    return `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
  }

  openGoogleMaps() {
    const url = this.getGoogleMapsUrl();
    window.open(url, '_blank');
  }
}
