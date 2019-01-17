import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { FriendsComponent} from './friends/friends.component';
import { GameComponent} from './game/game.component';
import { QuizComponent } from './quiz/quiz.component';
import { Quiz2Component } from './quiz2/quiz2.component';
import { PasswordFgComponent } from './password-fg/password-fg.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PointsComponent } from './points/points.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: FriendsComponent },
  {path: 'friends', component: FriendsComponent },
  {path: 'profil', component: ProfilComponent },
  {path: 'game', component: GameComponent },
  {path: 'quiz', component: QuizComponent },
  {path: 'quiz2', component: Quiz2Component },
  {path: 'pwchange/:token', component: PasswordChangeComponent },
  {path: 'pwfg', component: PasswordFgComponent },
  {path: 'points', component: PointsComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{path: 'users/:id', component: ProfilComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

