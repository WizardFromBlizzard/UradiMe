import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  boje: Array<any> = ['#fff200', '#ff9f1a', '#ff3838', '#32ff7e', '#18dcff', '#c56cf0', '#ffb142', '#474787', '#30336b', '#be2edd']
  
  kategorije: Array<object>;
  
  imeKategorije: string = '';

  idKategorije: string;

  dataStatus: string = 'Dodaj';

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.loadCategories().subscribe(resp => {
      console.log(resp);
      
      this.kategorije = resp;
    })
  }

  onSubmit(form: NgForm){

    if(this.dataStatus === 'Dodaj'){
      let nasumicanBroj = Math.floor( Math.random() * this.boje.length );

      let kategorija = {
        kategorija: form.value.imeKategorije,
        boja: this.boje[nasumicanBroj],
        brojac: 0
    }

    this.categoryService.saveCategory(kategorija);
    }else if(this.dataStatus === 'Preimenuj'){
      console.log(this.idKategorije);
      
      this.categoryService.updateCategory(this.idKategorije, form.value.imeKategorije);
      form.resetForm();
      this.dataStatus = 'Dodaj';
    }
    
  }

  onEdit(kategorija: string, id: string){
    console.log(kategorija);
    console.log(id);
    
    this.imeKategorije = kategorija;
    this.dataStatus = 'Preimenuj'
    this.idKategorije = id;
  }

  onDelete(id: string){
    this.categoryService.deleteCategory(id);
  }

}
