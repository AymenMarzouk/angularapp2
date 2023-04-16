import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, UtilisateurTestService } from '../services';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  Utilisateur_Tests: any = [];
  Choix_Utilisateur: any = [];
  idtest: number;
  iduser: number;
  voirtest: boolean = true;
  usertoken: string;
  constructor(private route: ActivatedRoute,
    private testutilisateur: UserService,
    private router: Router,
    private testutilisateurread: UtilisateurTestService) { }

  ngOnInit(): void {

    this.idtest = this.route.snapshot.params['idtest'];
    this.usertoken = sessionStorage.getItem('currentUserToken');
    this.testutilisateur.getByToken(this.usertoken).subscribe((data: any) => {
      this.iduser = data.id
      if (this.idtest == 0) {
        this.testutilisateur.getTestUtisateursById(this.iduser).subscribe((data: {}) => {
          this.Utilisateur_Tests = data
        })
        this.testutilisateur.getChoixTestUtisateursById(this.iduser).subscribe((data: {}) => {
          this.Choix_Utilisateur = data

        })
      }
      else {
        this.testutilisateurread.getTestsByIdUserIdTest(this.iduser, this.idtest).subscribe((data: {}) => {
          this.Utilisateur_Tests = data
         

        })
      }
    })
  }

  retouracceuil() {
    this.router.navigate(['/categorie']);
  }
  voirtouslestests() {
    this.testutilisateur.getTestUtisateursById(this.iduser).subscribe((data: {}) => {
      this.Utilisateur_Tests = data
     
    })
    this.voirtest = false;
  }


}