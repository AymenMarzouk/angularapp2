import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilisateurTest } from '../models/UtilisateurTest';
import { Reponse } from '../models/Reponse';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UtilisateurTestService {
  
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
  getReponses(): Observable<UtilisateurTest> {
    return this.http.get<UtilisateurTest>(this.apiURL + '/reponses')
    .pipe(
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  getReponsesByQuestionId(idquestion: number): Observable<UtilisateurTest> {
    return this.http.get<UtilisateurTest>(this.apiURL + '/reponses?question=' + idquestion)
    .pipe(
      catchError(this.handleError)
    )
  }  
  getReponsesByQuestionIdandcorrectanswer(idquestion: number): Observable<UtilisateurTest> {
    return this.http.get<UtilisateurTest>(this.apiURL + '/reponses?question=' + idquestion+'&reponse_correcte=1')
    .pipe(
      catchError(this.handleError)
    )
  }  
  getTestsById(idtest): Observable<UtilisateurTest> {
    return this.http.get<UtilisateurTest>(this.apiURL + '/tests?id=' + idtest)
    .pipe(
      catchError(this.handleError)
    )
  }  
  getTestsByIdUserIdTest(iduser,idtest): Observable<UtilisateurTest> {
    return this.http.get<UtilisateurTest>(this.apiURL + '/utilisateur_testread?utilisateur='+iduser+'&id='+idtest)
    .pipe(
      catchError(this.handleError)
    )
  }  
  // HttpClient API post() method => Create employee
  createUtilisateurTest(UtilisateurTest): Observable<UtilisateurTest> {
    return this.http.post<UtilisateurTest>(this.apiURL + '/utilisateur_test', JSON.stringify(UtilisateurTest), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(id, Test): Observable<UtilisateurTest> {
    return this.http.put<UtilisateurTest>(this.apiURL + '/employees/' + id, JSON.stringify(Test), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id){
    return this.http.delete<UtilisateurTest>(this.apiURL + '/employees/' + id, this.httpOptions)
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