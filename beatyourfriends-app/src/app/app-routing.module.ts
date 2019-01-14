import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from './auth-gard.service';
import { ProfilComponent } from './profil/profil.component';
import { FriendsComponent} from './friends/friends.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const routes: Routes = [
  {path: 'login', component: LoginComponent,},
  {path: 'dashboard', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
  {path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'users/:id', component: ProfilComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

