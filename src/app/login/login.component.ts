import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  
  user: User = { username: '', password: '' };

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  checkLogin() {
    this.user.username = this.username;
    this.user.password = this.password;

    this.authenticationService.authenticate(this.user).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (err) => {
        console.log('Hata!!!')
        this.controlForValidCredentials();
      }
    )
  }

  controlForValidCredentials(){
    if(sessionStorage.getItem('username') === null){
      alert ("Kullanıcı adı veya şifre yanlış!");
      this.username = '';
      this.password = '';
    }
  }
  
}
