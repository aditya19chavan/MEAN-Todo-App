import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TodoService} from './services/todo.service'; 
import { Task } from './services/todo.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  task: string = '';
  taskList: Task[] = [];

  constructor(private todoService: TodoService) {} // 

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  addTask() {
    const trimmed = this.task.trim();
    if (trimmed) {
      this.todoService.addTask({ task: trimmed }).subscribe(newTask => {
        this.taskList.push(newTask);
        this.task = '';
      });
    }
  }

  deleteTask(taskId: string) {
    this.todoService.deleteTask(taskId).subscribe(() => {
      this.taskList = this.taskList.filter(t => t._id !== taskId); // 
    });
  }

  trackById(index: number, task: Task): string {
    return task._id || index.toString(); 
  }
  
}
