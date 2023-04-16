import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { routing }        from './app-routing.module';
import { translate }        from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { RegisterEntrepriseComponent } from './register-entreprise/register-entreprise.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestsComponent } from './tests/tests.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionsService } from './services';
import { HistoriquetestComponent } from './historiquetest/historiquetest.component';
import { ScoreComponent } from './score/score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailtestComponent } from './detailtest/detailtest.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { CountdownModule } from 'ngx-countdown';



import { AcceuilComponent } from './acceuil/acceuil.component';
import { ServicesComponent } from './services/services.component';
import { FormationComponent } from './formation/formation.component';
import { CarriereComponent } from './carriere/carriere.component';
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { TesttechniqueComponent } from './testtechnique/testtechnique.component';
import { ClickOutsideModule } from 'ng-click-outside';

export function createTranslateLoader(http:HttpClient){
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
  
  declarations: [
      AppComponent,
      AlertComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      ConfirmEmailComponent,
      RegisterEntrepriseComponent,
      ProfileComponent,
      CategoriesComponent,
      TestsComponent,
      QuizComponent,
      HistoriquetestComponent,
      ScoreComponent,
      DashboardComponent,
      DashboardadminComponent,
      DetailtestComponent,
      AcceuilComponent,
      ServicesComponent,
      FormationComponent,
      CarriereComponent,
      AproposComponent,
      ContactComponent,
      TesttechniqueComponent,
     
      
  ],
  imports: [
    CountdownModule ,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ClickOutsideModule,
    routing,
    RouterModule,
    FormsModule,
    TranslateModule.forRoot({
      loader:{
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps:[HttpClient]
      }
    })
],
  exports: [
    
    TranslateModule
  ],
  providers: [
      { provide: QuestionsService},
     // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }