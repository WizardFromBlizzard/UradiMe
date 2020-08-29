import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private fireService: AngularFirestore, private toastr: ToastrService) { }


  saveTodo(id: string, data){
    this.fireService.collection('kategorije').doc(id).collection('zadaci').add(data).then(res => {
      this.fireService.doc(`kategorije/${id}`).update({brojac: firestore.FieldValue.increment(1)});
      this.toastr.success('Novi zadatak je uspešno sačuvan');
    })
  }

  loadTodos(id: string){
    return this.fireService.collection('kategorije').doc(id).collection('zadaci').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  updateTodo(idKategorije: string, idZadatka: string, updatedData: string){
    this.fireService.collection('kategorije').doc(idKategorije).collection('zadaci').doc(idZadatka).update({zadatak: updatedData}).then(()=> {
      this.toastr.success('Zadatak je uspešno preimenovan');
    })
  }

  deleteTodo(idKategorije: string, idZadatka: string){
    this.fireService.collection('kategorije').doc(idKategorije).collection('zadaci').doc(idZadatka).delete().then(()=> {
      this.fireService.doc(`kategorije/${idKategorije}`).update({brojac: firestore.FieldValue.increment(-1)});
      this.toastr.error('Zadatak je uspešno izbrisan');
    })
  }

  markComplete(idKategorije: string, idZadatka: string){
    this.fireService.collection('kategorije').doc(idKategorije).collection('zadaci').doc(idZadatka).update({isCompleted: true}).then(()=> {
      this.toastr.info('Zadatak je uspešno urađen');
    })
  }
  markUncomplete(idKategorije: string, idZadatka: string){
    this.fireService.collection('kategorije').doc(idKategorije).collection('zadaci').doc(idZadatka).update({isCompleted: false}).then(()=> {
      this.toastr.warning('Zadatak je nezavršen');
    })
  }
}
