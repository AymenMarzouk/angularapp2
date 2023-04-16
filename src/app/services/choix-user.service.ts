import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../models/Test';
import { Choix_user } from '../models/Choix_user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class Choix_userService {
  
  // Define API
  apiURL = 'https://decisionkeysit.com';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getQuestions(): Observable<Choix_user> {
    return this.http.get<Choix_user>(this.apiURL + '/questions')
    .pipe(
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  getQuestionsBytestId(idtest): Observable<Choix_user> {
    return this.http.get<Choix_user>(this.apiURL + '/questions?test=' + idtest)
    .pipe(
      catchError(this.handleError)
    )
  }  

  getTestsById(idtest): Observable<Choix_user> {
    return this.http.get<Choix_user>(this.apiURL + '/tests?id=' + idtest)
    .pipe(
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create Choix_user
  createupdateChoix_user(Choix_user): Observable<Choix_user> {
    return this.http.put<Choix_user>(this.apiURL + '/choix_utilisateur', JSON.stringify(Choix_user), this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(id, Test): Observable<Choix_user> {
    return this.http.put<Choix_user>(this.apiURL + '/employees/' + id, JSON.stringify(Test), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id){
    return this.http.delete<Test>(this.apiURL + '/employees/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}