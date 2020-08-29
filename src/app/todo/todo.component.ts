import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  idKategorije: string;
  idZadatka: string;
  zadaci: Array<object>
  imeZadatka: string;
  dataStatus: string = 'Dodaj';
  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idKategorije = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.todoService.loadTodos(this.idKategorije).subscribe(resp => {
      this.zadaci = resp;
      console.log(this.zadaci);
      
    });
    
  }

  onSubmit(form:NgForm){
    
    if(this.dataStatus === 'Dodaj'){
      let todo = {
        zadatak: form.value.imeZadatka,
        isCompleted: false
      }
  
      console.log(todo);
      
  
      this.todoService.saveTodo(this.idKategorije, todo);
      form.resetForm();
    }else if (this.dataStatus === 'Preimenuj'){
      this.todoService.updateTodo(this.idKategorije, this.idZadatka, form.value.imeZadatka);
      form.resetForm();
      this.dataStatus = 'Dodaj';
    }
    
  }

  onEdit(zadatak: string, id: string){
    
    
    this.imeZadatka = zadatak;
    this.dataStatus = 'Preimenuj'
    this.idZadatka = id;
  }

  onDelete(idZadatka: string){
    this.todoService.deleteTodo(this.idKategorije, idZadatka);
  }
}
