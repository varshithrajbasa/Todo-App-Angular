import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './../../service/todo.service';

import { Todo } from './../../model/todo';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  faTrashAlt = faTrashAlt;
  todos: Todo[];
  tempTodos: Todo[];
  activeButtons = {
    in_complete: true,
    completed: false,
    show_all: false,
  };
  $onDestroySubject: Subject<any> = new Subject();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.$todos.pipe(takeUntil(this.$onDestroySubject)).subscribe({
      next: (todos) => {
        this.tempTodos = this.todos = todos;
        console.log(todos);
        if (this.activeButtons.completed) {
          this.showFilteredData(0);
        } else if (this.activeButtons.in_complete) {
          this.showFilteredData(1);
        } else if (this.activeButtons.show_all) {
          this.showFilteredData(2);
        }
      },
    });
  }

  changeTodoStatus(todo: Todo) {
    this.todoService.changeStatus(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  showFilteredData(type: number) {
    if (type === 2) {
      // show all
      this.todos = this.tempTodos;
      this.setActiveButton(false, false, true);
      return;
    }
    if (type === 1) {
      //incompleted
      this.todos = this.tempTodos.filter((ele) => !ele.isComplete);
      this.setActiveButton(true, false, false);
    } else if (!type) {
      //completed
      this.todos = this.tempTodos.filter((ele) => ele.isComplete);
      this.setActiveButton(false, true, false);
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

  ngOnDestroy() {
    this.$onDestroySubject.next();
    this.$onDestroySubject.complete();
  }
}
