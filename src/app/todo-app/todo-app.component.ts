import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/Task';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {

  _task: Task = { completed: false, taskName: ''};
  
  _taskList: Task[];

  constructor(private taskService : TaskServiceService){ }

  ngOnInit() {
    this.taskService.findAll().subscribe(data => {this._taskList = data});
  }

  addTask(todo: Task){
    if (this._task.taskName != "" && this.isNotThereAnyItemLikeWantsToAddOnItemList(todo)) {
      this._taskList.push({ 'completed': this._task.completed, 'taskName': this._task.taskName});
      this.taskService.saveTask(todo).subscribe();
      this._task.taskName = '';
    }else{
      this.warnForAdding();
      this._task.taskName = '';
    }
  }

  updateCompleteStatus(todo: Task){
    if (todo.completed == true) {
      todo.completed = false;
      this.taskService.updateTask(todo).subscribe();
    }else{
      todo.completed = true;
      this.taskService.updateTask(todo).subscribe();
    }
  }

  deleteTask(todo: Task){
    let index = this._taskList.indexOf(todo);
    if(todo.completed == false){
      var booleanValue = this.warnForDeleteInProgressTask();
      if(booleanValue){
        this._taskList.splice(index, 1);
        this.taskService.deleteTask(todo.taskName).subscribe();
      }else{
        this.updateCompleteStatus(todo);
      }
    }else{
      this._taskList.splice(index, 1);
      this.taskService.deleteTask(todo.taskName).subscribe();
    }
  }

  warnForAdding() {
    alert ("Boş görev ya da var olanlar ile aynı isimli görev girilemez!");
  }

  warnForDeleteInProgressTask() {
    var retVal = confirm("Hala devam etmekte olan bir görevi silmek istiyorsunuz. Devam edecek misiniz?");
    if( retVal == true ) {
      return true;
    } else {
      return false;
    }
  }

  isNotThereAnyItemLikeWantsToAddOnItemList(todo: Task) {
    //var olan liste içerisinde aynı task var mı yok mu diye bakıyor
    let indexOfExistItem = this._taskList.findIndex(k => k.taskName == todo.taskName);
    if(indexOfExistItem == -1){
      return true;
    }else{
      return false;
    }
  }

}
