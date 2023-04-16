import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    //private currentUserSubject: BehaviorSubject<User>;
    public currentUserKey = new BehaviorSubject <string> (sessionStorage.getItem('currentUser')) ;
    public currentUser = new BehaviorSubject <boolean> (this.checkoutCurrentUser()) ;
    apiUrl = 'https://decisionkeysit.com';
    
    constructor(private http: HttpClient) {
       // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
       
    }

  /*  public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }*/
    checkoutCurrentUser() : boolean
    {
        if(sessionStorage.getItem('currentUser') != null) {
           return true ;
        }
        return false ;}
    

    login(email: string, password: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
       
        return this.http.post<any>(`${this.apiUrl}/api/login/login/`, { email, password },{ headers, 
            responseType:  'json'}) ;
    }
    get currentuserStatus(){
        return this.currentUser.asObservable() ;
    }
    get currentuserkeyusername(){
        return this.currentUserKey.asObservable() ;
    }
    logout() {
        // remove user from local storage to log user out
        this.currentUser.next(false) ;
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUserToken');
        
        //this.currentUserSubject.next(null);
    }
}