import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; //form işlemleri için ekledim
import { AboutComponent } from './about/about.component';
import { TodoAppComponent } from './todo-app/todo-app.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TodoAppComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent
  ],

  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule //form işlemleri için ekledim
  ],

  providers: [
    HttpClientModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
