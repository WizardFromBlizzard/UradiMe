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

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){

    let nasumicanBroj = Math.floor( Math.random() * this.boje.length );

    let kategorija = {
      kategorija: form.value.imeKategorije,
      boja: '#c8c8c8c',
      brojac: 0
    }

    this.categoryService.saveCategory(kategorija);
  }

}
