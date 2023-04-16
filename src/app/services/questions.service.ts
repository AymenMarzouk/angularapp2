import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Test } from '../models/Test';
import { Question } from '../models/Question';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {
  
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
  getQuestions(): Observable<Question> {
    return this.http.get<Question>(this.apiURL + '/questions')
    .pipe(
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  getQuestionsBytestId(idtest): Observable<Question> {
    return this.http.get<Question>(this.apiURL + '/questions?test=' + idtest)
    .pipe(
      catchError(this.handleError)
    )
  }  

  getTestsById(idtest): Observable<Test> {
    return this.http.get<Test>(this.apiURL + '/tests?id=' + idtest)
    .pipe(
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create employee
  createEmployee(Test): Observable<Test> {
    return this.http.post<Test>(this.apiURL + '/categorie', JSON.stringify(Test), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(id, Test): Observable<Test> {
    return this.http.put<Test>(this.apiURL + '/employees/' + id, JSON.stringify(Test), this.httpOptions)
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