import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore, no AngularFirestoreModule

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {} // Inyecta AngularFirestore

  guardarUbicacion(latitude: number, longitude: number) {
    return this.firestore.collection('ubicaciones_Chasi_Guanoluisa_Shiao').add({
      latitude,
      longitude
    });
  }
}
