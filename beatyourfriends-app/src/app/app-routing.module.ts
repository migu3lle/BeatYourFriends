import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth-gard.service';
import { ProfilComponent } from './profil/profil.component';
import { FriendsComponent} from './friends/friends.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: ProfilComponent, canActivate: [AuthGuard] },
  {path: 'friends', component: FriendsComponent },
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{path: 'users/:id', component: ProfilComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

