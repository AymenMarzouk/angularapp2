import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ngxtranslat';
  currentUser$: Observable<boolean>;
  currentuserkey$ : Observable<string>;
  showNav = true;
  
ngOnInit() {

 /* hide navbar specifique (n2) de l'application et show navbar global (n1)  de l'application*/
  $("#n2").hide();
  $("#n1").show();
  this.currentuserkey$ = this.authenticationService.currentuserkeyusername ;
  this.currentUser$ = this.authenticationService.currentuserStatus ;
  $('body').css('margin-top', $('.navbar-area').height() + 'px')

  // detect scroll top or down
  if (($('.smart-scroll').length > 0) ) { // check if element exists
      var last_scroll_top = 0;
      $(window).on('scroll', function() {
          var scroll_top = $(this).scrollTop();
          if(scroll_top < last_scroll_top) {
              $('.smart-scroll').removeClass('scrolled-down').addClass('scrolled-up');
             
          }
          else {
              $('.smart-scroll').removeClass('scrolled-up').addClass('scrolled-down');
              
          }
          last_scroll_top = scroll_top;
      });
  }
}



  constructor( public translate:TranslateService,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router,){
    
    /* changement de la langue de l'application*/
    translate.addLangs(['Anglais','Francais']);
    translate.setDefaultLang('Francais');
    const browserLang =translate.getBrowserLang();
    translate.use(browserLang.match(/Anglais|Francais/) ? browserLang:'Francais');
    
    localStorage.setItem("h1","true");
    localStorage.setItem("h2","false");
 }

 ch(){
    
  /*cacher le navbar principale et afficher le navbar specipique de l'application */
  localStorage.setItem("h1","false");

  localStorage.setItem("h2","true");
  
  $("#n1").hide();
 
  $("#n2").show();

}

onClickedOutside(e: Event) {
  
  this.showNav=!this.showNav;
  
}

onClickedBtn() {
  
  this.showNav=false;
  
}
}
