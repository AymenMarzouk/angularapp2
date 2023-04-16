import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProfileComponent } from './profile';
import { RegisterEntrepriseComponent } from './register-entreprise/register-entreprise.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestsComponent } from './tests/tests.component';
import { QuizComponent } from './quiz/quiz.component';
import { HistoriquetestComponent } from './historiquetest/historiquetest.component';
import { ScoreComponent } from './score/score.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ServicesComponent } from './services/services.component';
import { FormationComponent } from './formation/formation.component';
import { CarriereComponent } from './carriere/carriere.component';
import { AproposComponent } from './apropos/apropos.component';
import { ContactComponent } from './contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { TesttechniqueComponent } from './testtechnique/testtechnique.component';
import { DetailtestComponent } from './detailtest/detailtest.component';

const appRoutes: Routes = [
    { path: '', component: AcceuilComponent },
    //{ path: 'registerentreprise', component: RegisterEntrepriseComponent ,outlet:"testtechnique"},
    { path: 'acceuil', component: AcceuilComponent},
    { path: 'service', component: ServicesComponent},
    { path: 'formation', component: FormationComponent},
    { path: 'carriere', component: CarriereComponent},
    { path: 'apropos', component: AproposComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'test', component: TesttechniqueComponent, children:[
        {
        path : 'login',
        component: LoginComponent},
        {
            path : 'register',
            component: RegisterComponent},
            {
                path : 'profile',
                component: ProfileComponent},
                {
                    path : 'categorie',
                    component: CategoriesComponent},
                    {
                        path : 'categorie/:id',
                        component: TestsComponent},
                        {
                            path : 'quiz/:id',
                            component: QuizComponent},
                            {
                                path : 'utilisateur_test',
                                component: HistoriquetestComponent},
                                {
                                    path : 'utilisateur_test',
                                    component: HistoriquetestComponent},
                                    {
                                        path : 'score/:idtest',
                                        component: ScoreComponent},
                                        {
                                            path : 'dashboard',
                                            component: DashboardComponent},
                                            {
                                                path : 'dashboardadmin',
                                                component: DashboardadminComponent},
                                                { path: 'test/:id', component: DetailtestComponent },
        
      ]},
    // otherwise redirect to home
    { path: '**', component: AcceuilComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
export const translate = TranslateModule.forRoot()