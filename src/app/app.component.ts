import { Component } from '@angular/core';
import { Todo } from './Models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // app.component.html sayfasında onClick handler'ı üzerinde referans verilen tüm metodları bu yorum satırının altına ekledim

  ItemList = [];

  Item: Todo = { Completed: false, ItemName: ''};

  addTask(todo: Todo){
    //debugger;
    if (this.Item.ItemName != "" && this.isNotThereAnyItemLikeWantsToAddOnItemList(todo)) {
      this.ItemList.push({ 'Completed': this.Item.Completed, 'ItemName': this.Item.ItemName});
      this.Item.ItemName = '';
    }else{
      this.warn();
      this.Item.ItemName = '';
    }
    console.log(this.ItemList);
  }

  todoComplete(todo: Todo){
    if (todo.Completed == true) {
      this.ItemList.find(x=> x.ItemName == todo.ItemName).Completed = false;
    }else{
      this.ItemList.find(x=> x.ItemName == todo.ItemName).Completed = true;
    }
    console.log(this.ItemList);
  }

  delete(todo: Todo){
    let index = this.ItemList.indexOf(todo);
    this.ItemList.splice(index, 1);
  }

  warn() {
    alert ("Boş görev ya da var olanlar ile aynı isimli görev girilemez!");
  }

  isNotThereAnyItemLikeWantsToAddOnItemList(todo: Todo) {
    //var olan liste içerisinde aynı task var mı yok mu diye bakıyor, ona göre boolean değer döndürüyor.
    let indexOfExistItem = this.ItemList.findIndex(k => k.ItemName == todo.ItemName);
    if(indexOfExistItem == -1){
      return true;
    }else{
      return false;
    }
  }

}
