import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    apiUrl ='https://decisionkeysit.com';
    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
    getUsers(id:number): Observable<any> {
        return this.http.get<any>('https://decisionkeysit.com/users?id='+id)
        .pipe(
          catchError(this.handleError)
        )
      }
      getTestUtisateursById(iduser): Observable<any> {
        return this.http.get<any>('https://decisionkeysit.com' + '/utilisateur_testread?utilisateur='+ iduser)
        .pipe(
          catchError(this.handleError)
        )
      }
    
      getChoixTestUtisateursById(iduser): Observable<any> {
        return this.http.get<any>('https://decisionkeysit.com' + '/utilisateur_test?utilisateur='+ iduser)
        .pipe(
          catchError(this.handleError)
        )
      }
    getByToken(token: string) {
      const optionRequete = {
        headers: new HttpHeaders({ 
          'Authorization':'Token '+ token
        })}
        return this.http.get(`${this.apiUrl}/api/login/users/me/`,optionRequete);
    }

    register(user: User):any {
      console.log(user);
       var usertosend ={"first_name":user.first_name,"last_name":user.last_name,"email":user.email,"password":user.password1} ;
        return this.http.post(`${this.apiUrl}/api/login/signup/`, usertosend);
    }
    changepassword(email:string,oldpassword:string,newpassword:string):any {
      
       var datatosend ={"emaill":email,"oldpassword":oldpassword,"password":newpassword} ;
        return this.http.post(`${this.apiUrl}/api/login/password/change/`, datatosend);
    }
    registerEntreprise(user: User) {
        return this.http.post(`${this.apiUrl}/api/v1/auth/registration/`, user);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
    verifemail(code: string) {
      console.log("we entered")
      const optionRequete = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*'
        })}
      return this.http.get("http://127.0.0.1/api/login/signup/verify/?code="+code, optionRequete );
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