import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './pages/student/student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent , data: {animation: 'Home'} },
  { path: 'student', component: StudentComponent , data: {animation: 'Student'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
