import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

// pathler ve referans componentleri belirtiliyor. Bu componentler içinde ki html dosyalar gösterilecek..
const routes: Routes = [
  {
    path: '', 
    component: TodoAppComponent
  },
  {
    path: 'about', 
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
