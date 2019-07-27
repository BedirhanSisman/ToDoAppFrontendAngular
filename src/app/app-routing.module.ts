import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

const routes: Routes = [
  {
    path: '', 
    component: TodoAppComponent,
    runGuardsAndResolvers: "always"
  },
  {
    path: 'about', 
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
