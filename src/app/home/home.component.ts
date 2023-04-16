import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User} from '../models';
import { UserService, AuthenticationService, TestsService } from '../services';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ 
    selector: 'app-home',
    templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit, OnDestroy {
  iduserstatique:number=1;
    currentUser: boolean;
    Utilisateur:any= [];
    currentUserSubscription: Subscription;
    users: User[] = [];
    email : string; 
    password : string ;
    verifcode : string;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private cookieService: CookieService,
        private router: Router,
        private route: ActivatedRoute
    ) {
       // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            
      //  });
    }

    ngOnInit() {
        //this.loadAllUsers();
      //  this.currentUser = this.authenticationService.currentUser;
      this.verifcode = this.route.snapshot.params['code'];
      console.log("this is the code "+this.verifcode)
      if(this.verifcode != undefined) {
          this.userService.verifemail(this.verifcode).pipe(first()).subscribe(() => {
            this.router.navigate(['/test/login']);
        });
          
         
      }
     // this.loadUtilisateurs(this.iduserstatique);
     
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
      // this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    gettestsbyiduser(iduser: number) {

        this.router.navigate(['/test/utilisateur_test', iduser]); 
       //  this.testservice.getTestsBycategorieId(id).subscribe((data: {}) => {
       //  this.Tests=data
      
        //})
        //return this.router.navigate(['/tests'],this.Tests); 
      }
      gettestsbyiduser1(iduser: number,idtest:number) {

        this.router.navigate(['/test/score', iduser,idtest]); 
       //  this.testservice.getTestsBycategorieId(id).subscribe((data: {}) => {
       //  this.Tests=data
      
        //})
        //return this.router.navigate(['/tests'],this.Tests); 
      }

      loadUtilisateurs(id:number) {
        return this.userService.getUsers(id).subscribe((data: {}) => {
          this.Utilisateur = data;
        })
      }
}