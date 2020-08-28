import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fireService: AngularFirestore, private toastr: ToastrService) { }


  saveCategory(data) {
    this.fireService.collection('kategorije').add(data).then(ref => {
      this.toastr.success('Sacuvana nova kategorija');
      
    })
  }
}
