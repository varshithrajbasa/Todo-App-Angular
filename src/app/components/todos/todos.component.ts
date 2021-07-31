import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../service/todo.service';

import { Todo } from './../../model/todo';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  todos:Todo[]
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos =>  {
      this.todos = todos
    })
    
  }

  changeTodoStatus(todo: Todo){
    this.todoService.changeStatus(todo);
  }
  deleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo);  
  }


}
