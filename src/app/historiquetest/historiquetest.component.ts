import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService, TestsService } from '../services';

@Component({
  selector: 'app-historiquetest',
  templateUrl: './historiquetest.component.html',
  styleUrls: ['./historiquetest.component.css']
})
export class HistoriquetestComponent implements OnInit {

  Utilisateur_Tests: any = [];
  idtest: number;
  iduser:number;
usertoken:string;
  constructor(private route: ActivatedRoute,
    private testutilisateur:UserService, 
    private testservice:TestsService,
    private router: Router) { }

  ngOnInit(): void {
    this.usertoken=sessionStorage.getItem('currentUserToken');
    this.testutilisateur.getByToken(this.usertoken).subscribe((data:any) => {
      this.iduser=data.id
      this.testutilisateur.getTestUtisateursById(this.iduser).subscribe((data: {}) => {
        this.Utilisateur_Tests=data
    })
  })
  
}

gettestsbyidtest(id: number) {

  this.router.navigate(['/test/quiz', id]); 
 
}
voirdetailstest(iduser:number,idtest:number){
  this.router.navigate(['/test/score', idtest]); 
}

}
