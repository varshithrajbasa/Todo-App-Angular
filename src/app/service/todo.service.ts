import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Todo } from '../model/todo';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[];
  $todos: BehaviorSubject<Todo[]> = new BehaviorSubject(null);
  constructor() {
    this.todos = [
      {
        id: '111',
        isComplete: false,
        date: new Date(),
        title: 'Hello There, Feel Free to Use Our Todo App',
      },
    ];
    if (!localStorage.getItem('todos'))
      localStorage.setItem('todos', JSON.stringify(this.todos));
    this.todos = JSON.parse(localStorage.getItem('todos'));
    this.$todos.next(this.todos);
  }
  getTodos() {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    return of(this.todos);
  }
  addTodos(todo: Todo) {
    this.todos.unshift(todo);
    this.$todos.next(this.todos);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  changeStatus(todo: Todo) {
    this.todos.map((singleTodo) => {
      if (singleTodo.id == todo.id) {
        todo.isComplete = !todo.isComplete;
      }
    });
    this.$todos.next(this.todos);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  deleteTodo(todo: Todo) {
    const indexofTodo = this.todos.findIndex(
      (currentObj) => currentObj.id === todo.id
    );
    this.todos.splice(indexofTodo, 1);
    this.$todos.next(this.todos);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
