import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map, catchError } from 'rxjs/operators';
import { AlertService, AuthenticationService, UserService } from '../services';
import { CookieService } from 'ngx-cookie-service';
import { throwError, Observable, observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, JsonpClientBackend } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import swal from "sweetalert2";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    rememberme : boolean ;
    email : string; 
    password : string ;
     tokens= ['','{','}','[',']','.','"'] ;
     usertoken:string;
    //returnUrl: string;
   

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userservice: UserService,
        private alertService: AlertService,
        private cookieService: CookieService,
        private _http:HttpClient
        
    ) {
this.email = "";
this.password = "";
        
        // redirect to home if already logged in
        if (this.authenticationService.checkoutCurrentUser()) { 
            this.router.navigate(['/test/categorie']);
        }
    }
    
    ngOnInit() {
       
      //  this.authenticationService.currentUser = false ;
      if(this.cookieService.get("remember") === 'true' ){
        this.email =this.cookieService.get("email") ;
        this.password = this.cookieService.get("password");
        this.authenticationService.login( this.email, this.password).pipe(first())
        .subscribe(

            data => {
                
               
                sessionStorage.setItem('currentUser', JSON.parse(data).key);
                    this.authenticationService.currentUserKey.next(sessionStorage.getItem('currentUser'));
                this.router.navigate(['/test/categorie']); 
            });
    }
  
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
            password: ['', Validators.required],
            remember : ['']
        });

        // get return url from route parameters or default to '/'
      ///  this.returnUrl = this.route.snapshot.queryParams['profil'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    private handleError(errorResponse : HttpErrorResponse){
        console.error(errorResponse) ;
        return new Observable<HttpErrorResponse>() ;
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login( this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(

                data => {
                    if(this.f.remember.value === true){
                    this.cookieService.set( 'email', this.f.email.value,10 );
                    this.cookieService.set( 'password', this.f.password.value,10 );
                    this.cookieService.set( 'remember', this.f.remember.value,10 );
                        }
                
                    this.authenticationService.currentUser.next(true) ;
                    sessionStorage.setItem('currentUser', data.user_firstname);
                    sessionStorage.setItem('currentUserToken', data.token);
                    sessionStorage.setItem('currentUserEmail', this.f.email.value);
                    this.authenticationService.currentUserKey.next(sessionStorage.getItem('currentUser'));
                    
                    this.router.navigate(['/test/categorie']); 
                },
                error  => {
                    
                    swal.fire({icon: 'error',title:error.error.detail,showConfirmButton: true });
                    //this.alertService.error(this.splitMulti(JSON.stringify(error.error).substring(
                      //  JSON.stringify(error.error).lastIndexOf("[") + 1, 
                       // JSON.stringify(error.error).lastIndexOf("]")
                   // ),this.tokens));
                    this.authenticationService.currentUser.next(false) ;
                    this.loading = false;
                });
    }

   /* splitMulti(str, tokens){
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for(var i = 1; i < tokens.length; i++){
            str = str.split(tokens[i]).join(tempChar);
        }
        //str = str.split(tempChar);
        return str;
}*/
}