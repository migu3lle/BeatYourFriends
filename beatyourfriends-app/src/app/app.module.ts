import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { FooterComponent } from './footer/footer.component';
import { FriendsComponent } from './friends/friends.component';
import { User } from './user';
import { GameComponent } from './game/game.component';
import { QuizComponent } from './quiz/quiz.component';
import { PasswordFgComponent } from './password-fg/password-fg.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PointsComponent } from './points/points.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilComponent,
    FooterComponent,
    FriendsComponent,
    GameComponent,
    QuizComponent,
    PasswordFgComponent,
    PasswordChangeComponent,
    PointsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [User],
  bootstrap: [AppComponent]
})
export class AppModule { }
