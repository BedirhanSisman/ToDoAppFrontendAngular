import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  _user: User = { username: '', password: '' };
  
  _userList: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {this._userList = data}); 
  }

  addUser(user: User) {
    if (this._user.username.trim() != "" && this._user.password.trim() != "") {
      if(this.isNotThereAnyUserLikeWantsToAddOnUserList(user)) {
        this.userService.saveUser(user).subscribe();
        this.warnAndRefreshForAddingUser(user.username);
        this.cleanUserFields();
      }else{
        this.warnForAddingSameUser();
        this.cleanUserFields();
      }
    }else{
      this.warnForAddingEmptyUsernameOrPassword();
      this.cleanUserFields();
    }
  }

  deleteUser(user: User){
    let index = this._userList.indexOf(user);
      if(this.warnForDeleteUser(user.username)){
        this._userList.splice(index, 1);
        this.userService.deleteUser(user.username).subscribe();
      }
  }

  warnAndRefreshForAddingUser(username: string) {
    alert (username + " kullanıcısı başarılı şekilde kaydedildi!");
    window.location.reload();
  }

  warnForAddingSameUser() {
    alert ("Var olan kullanıcılar ile aynı isimli kullanıcı kaydedilemez!");
  }

  warnForAddingEmptyUsernameOrPassword() {
    alert ("Kullanıcı adı veya şifre boş bırakılamaz!");
  }

  warnForDeleteUser(username : string) {
    var retVal = confirm(username + " kullanıcısı silinecektir. Devam etmek istiyor musunuz?");
    if( retVal == true ) {
      return true;
    } else {
      return false;
    }
  }

  isNotThereAnyUserLikeWantsToAddOnUserList(user: User) {
    //var olan liste içerisinde aynı user var mı yok mu diye bakıyor
    let indexOfExistItem = this._userList.findIndex(k => k.username == user.username);
    if(indexOfExistItem == -1){
      return true;
    }else{
      return false;
    }
  }

  cleanUserFields(){
    this._user.username = '';
    this._user.password = '';
  }

}
