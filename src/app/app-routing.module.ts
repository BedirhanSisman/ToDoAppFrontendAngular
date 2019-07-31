import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodoAppComponent } from './todo-app/todo-app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';

// pathler ve referans componentleri belirtiliyor. Bu componentler içinde ki html dosyalar gösterilecek..
const routes: Routes = [
  {
    path: '', 
    component: TodoAppComponent,
    canActivate:[AuthGaurdService] // Bu satır login değilse "/login" sayfasına yönlendirmek için..
  },
  {
    path: 'about', 
    component: AboutComponent,
    canActivate:[AuthGaurdService] // Bu satır login değilse "/login" sayfasına yönlendirmek için..
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate:[AuthGaurdService] // Bu satır login değilse "/login" sayfasına yönlendirmek için..
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
