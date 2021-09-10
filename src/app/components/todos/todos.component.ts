import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../service/todo.service';

import { Todo } from './../../model/todo';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  todos: Todo[];
  tempTodos: Todo[];
  activeButtons = {
    in_complete: false,
    completed: false,
    show_all: false,
  };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.tempTodos = todos;
      this.todos = this.tempTodos.filter((ele) => !ele.isComplete);
      this.setActiveButton(true, false, false);
    });
  }

  changeTodoStatus(todo: Todo) {
    this.todoService.changeStatus(todo);
  }
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
  showFilteredData(type: number) {
    if (type === 1) {
      //incompleted
      this.todos = this.tempTodos.filter((ele) => !ele.isComplete);
      this.setActiveButton(true, false, false);
    } else if (!type) {
      //completed
      this.todos = this.tempTodos.filter((ele) => ele.isComplete);
      this.setActiveButton(false, true, false);
    } else {
      // show all
      this.todos = this.tempTodos;
      this.setActiveButton(false, false, true);
    }
  }

  setActiveButton(
    in_complete: boolean = false,
    completed: boolean = false,
    show_all: boolean = false
  ) {
    this.activeButtons = {
      in_complete: in_complete,
      completed: completed,
      show_all: show_all,
    };
  }
}
