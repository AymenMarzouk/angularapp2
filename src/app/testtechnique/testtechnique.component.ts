import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from '../services';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({ selector: 'appapp', templateUrl: 'testtechnique.component.html',styleUrls: ['./testtechnique.component.css'] })
export class TesttechniqueComponent implements OnInit{
  currentUser$: Observable<boolean>;
  currentuserkey$ : Observable<string>;
  showNav2 = true;
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private cookieService: CookieService
       
    ) {
     // this.currentUser = this.authenticationService.currentUser ;
    
   
    }
    

    ngOnInit(){
      console.log("loading app");
      this.currentuserkey$ = this.authenticationService.currentuserkeyusername ;
      this.currentUser$ = this.authenticationService.currentuserStatus ;
      $('body').css('margin-top', $('.navbar-area1').height() + 'px')

  // detect scroll top or down
  if ( ($('.smart-scroll1').length > 0)) { // check if element exists
      var last_scroll_top = 0;
      $(window).on('scroll', function() {
          var scroll_top = $(this).scrollTop();
          if(scroll_top < last_scroll_top) {
              
              $('.smart-scroll1').removeClass('scrolled-down1').addClass('scrolled-up1');
          }
          else {
             
              $('.smart-scroll1').removeClass('scrolled-up1').addClass('scrolled-down1');
          }
          last_scroll_top = scroll_top;
      });
  }
      //this.alert.modifymessage(false) ;
   /* $('#alert').mouseup(function(e) 
    {
      alertcomponent:AlertComponent ;
      
        var container = $("#alert");
            container.hide();
        this.currentUser$ 
            
        
    });*/
    /*
    window.onbeforeunload = function (e) {
      window.onunload = function () {
              window.localStorage.isMySessionActive = "false";
      }
      return undefined;
  };
  window.onload = function () {
            window.localStorage.isMySessionActive = "true";
};
*/
  
    //$("#124536").hide();$("#124537").hide();
   // localStorage.setItem("nav",JSON.stringify(this.nav1)); 
  //localStorage.setItem("nav1",JSON.stringify(this.nav1));
  //localStorage.setItem("nav2",JSON.stringify(this.nav2));
/*
  if(localStorage.getItem("lang")=="EN")
  {
  this.nav=this.nav2
  console.log("anglais")
  } 
  else
  {
    this.nav=this.nav1;
    console.log("français")
  }

  */

}


  //lang=true;
 // title = 'K.A.Z';
  //id=2;
  //lng="EN";
 // lng1="FR";
 // nav=[{lg:"",route:"",liste:[{id:"",route:""}]}];gg


/*
  nav1=[{lg:"Dévelopeur",route:"register",liste:[]},
  {lg:"Entreprise",route:"registerentreprise",liste:[]},

  {lg:"Login",route:"login",liste:[]},
  {lg:"SignUp",route:"register" ,liste:[]}];
*/
  /*nav1*/
  /* nav3=[{lg:"accueil",route:"/homefr",liste:[]},
  {lg:"services",route:"/servicesfr",liste:[]},
 {lg:"formations",route:"/training",liste:[{id:"formation 1",route:"/training"},{id:"formation 2",route:"/training2"}]},
  {lg:"Carrières",route:"/joinusfr",liste:[]},
  {lg:"A propos",route:"login",liste:[]},
  {lg:"test",route:"login",liste:[]},
  {lg:"contact",route:"contactfr" ,liste:[]}];
  nav2=[{lg:"home",route:"/home",liste:[]},
  {lg:"services",route:"/services",liste:[]},
 {lg:"training",route:"/training",liste:[{id:"formation 1",route:"/training"},{id:"formation 2",route:"/training2"}]},
  {lg:"careers",route:"/joinus",liste:[]},
  {lg:"about",route:"login",liste:[]},
  {lg:"contact",route:"contact" ,liste:[]}];
  */


    /*
  fff(even:any)
  { console.log("mobile")
    if (even.target.value=="FR")
    {this.nav=this.nav1; 
      //localStorage.setItem("nav",JSON.stringify(this.nav1));
      localStorage.setItem("lang","FR");
      //$("#1245").load("#124536");
      this.router.navigate(['/homefr'])
    }
      else
   { this.nav=this.nav2;
    //localStorage.setItem("nav",JSON.stringify(this.nav2));
    localStorage.setItem("lang","EN");
   //$("#1245").load("#124537");

   this.router.navigate(['/home'])
  }

  
  
  }
 
*/
/*
v(){console.log("clikkk")}


    

  
 
  ff(even:any)
  { console.log("web")
    if (even.target.value=="FR")
    {this.nav=this.nav1;this.router.navigate(['/homefr'])}
      else
   { this.nav=this.nav2;this.router.navigate(['/home'])}

    
}*/
logout() {
    this.authenticationService.logout();
    this.cookieService.deleteAll() ;
  //  this.authenticationService.currentUser = false ;
    this.router.navigate(['/test/login']);
}
onClickedOutside(e: Event) {
  
  this.showNav2=!this.showNav2;
  
}

onClickedBtn() {
  
  this.showNav2=false;
  
}
}