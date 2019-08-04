import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: AuthenticationService) { }

  ngOnInit() { }

  getCurrentUserName() {
    return sessionStorage.getItem('username');
  }

}
