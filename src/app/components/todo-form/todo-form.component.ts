import { Component, OnInit } from '@angular/core';
import  { Todo } from './../../model/todo';
import { v4 as uuidv4 } from 'uuid';
import { TodoService } from './../../service/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
todoTitle: string;
isEmpty:Boolean = false;
  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }
  handleAdd(){
    if(!this.todoTitle){
      this.isEmpty = true;
      return;
    }
    this.isEmpty = false;
    const newTodo: Todo = {
      id : uuidv4(),
      title: this.todoTitle,
      date: new Date(),
      isComplete : false
    }
    this.todoService.addTodos(newTodo);
    this.todoTitle = "";
  }

}
