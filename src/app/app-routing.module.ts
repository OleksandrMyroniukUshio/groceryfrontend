import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
const routes: Routes = [
  { 
    path: '', redirectTo: '/index', pathMatch:'full'
  },
  {
    path: "index",
    component: IndexPageComponent
  },
  { 
    path: 'groceries', 
    component: GroceryListComponent 
  },
  { 
    path: 'login', 
    component: LoginPageComponent
  },
  { 
    path: 'register', 
    component: RegisterPageComponent
  },
  { 
    path: '**', 
    redirectTo: '/index'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }