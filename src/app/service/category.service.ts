import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fireService: AngularFirestore, private toastr: ToastrService) { }


  saveCategory(data) {
    this.fireService.collection('kategorije').add(data).then(ref => {
      this.toastr.success('Sačuvana nova kategorija');
      
    })
  }


  loadCategories(){
    return this.fireService.collection('kategorije').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          
          
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  updateCategory(id: string, updatedData) {
    this.fireService.doc(`kategorije/${id}`).update({kategorija: updatedData}).then(()=> {
      this.toastr.success('Preimenovanje uspešno');
      
    })
  }

  deleteCategory(id: string){
    return this.fireService.doc(`kategorije/${id}`).delete().then(()=> {
      this.toastr.error('Kategorija izbrisana');
    })
  }
}
