import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsService,QuestionsService, ReponsesService, Choix_userService, UtilisateurTestService, UserService } from '../services';
import { Question } from '../models/Question';
import { Reponse } from '../models/Reponse';
import { Choix_user } from '../models/Choix_user';
import { UtilisateurTest } from '../models/UtilisateurTest';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  iduser:number;
  decrement: number=0;
  beforeQ =true;
  compteurQuestion=0
  Questions: any = [];
  Reponses: any =[];
  Tests: any = [];
  id: number;
  idquestion:  number;
  ChoixUser : Choix_user[] = [];
  reponsechecked : any = [];
  resultat : number ;
  ReponseCorrecte: number[] =[] ;
  ReponseUtilisateur: any = []
  completedscore:boolean=false;
  essai_id :number;
  flagechecsucces :number;
  reponse_correcte :number;
  question_non_repondues :number;
  question_repondues :number;
  nb_reponse_incorrectes:number;
  usertoken:string;
  constructor(
    private testservice: TestsService,
    private route: ActivatedRoute,
    private questionservice: QuestionsService,
    private reponseservice: ReponsesService,
    private choix_userService: Choix_userService,
    private utilisateurtestService: UtilisateurTestService,
    private userservice: UserService,
  ) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.testservice.getTestsById(this.id).subscribe((data: {}) => {
      this.Tests=data
  })
  this.usertoken=sessionStorage.getItem('currentUserToken');
  this.userservice.getByToken(this.usertoken).subscribe((data:any) => {
    this.iduser=data.id
})
  localStorage.setItem("reponsechecked", JSON.stringify(this.reponsechecked));
  }
  passertest(){
    this.beforeQ =false;
    this.questionservice.getQuestionsBytestId(this.id).subscribe((data: {}) => {
      this.Questions=data
      this.idquestion = this.Questions[this.compteurQuestion]['id'];
      this.reponseservice.getReponsesByQuestionId(this.idquestion).subscribe((data: {}) => {
        this.Reponses=data
    })

  })

  }
  checkValue(reponse_id:any,e){

    if(e.target.checked=== false){
      this.reponsechecked.forEach(element => {
        if(element['reponse'] ===reponse_id){
          let index = this.reponsechecked.indexOf(element) 
          this.reponsechecked.splice(index, 1); 
          localStorage.setItem("reponsechecked", JSON.stringify(this.reponsechecked));
        }
      });
      this.ChoixUser.forEach(element => {
        if(element['reponse'] ===reponse_id){
          let index = this.ChoixUser.indexOf(element) 
          this.ChoixUser.splice(index, 1); 
          return;
        }
      });}
 
    else {
      this.ChoixUser.push({"utilisateur":this.iduser,"test":this.id,"question":this.idquestion,"reponse":reponse_id})
      this.reponsechecked.push({"utilisateur":this.iduser,"test":this.id,"question":this.idquestion,"reponse":reponse_id})
      localStorage.setItem("reponsechecked", JSON.stringify(this.reponsechecked));
    }
  
  }
  precedente(){
    this.ChoixUser.forEach(element => {
      this.choix_userService.createupdateChoix_user(element).subscribe((data: {}) => {
    })
    });
    
    if(this.compteurQuestion > 0){
      this.compteurQuestion--;
      
    this.idquestion = this.Questions[this.compteurQuestion]['id'];
    this.reponseservice.getReponsesByQuestionId(this.idquestion).subscribe((data: {}) => {
      this.Reponses=data
  })}
  this.ChoixUser = [];
  }
  suivante(){
    this.ChoixUser.forEach(element => {
      this.choix_userService.createupdateChoix_user(element).subscribe((data: {}) => {
    })
    });
    this.compteurQuestion++;
    if(this.compteurQuestion-1!=this.Questions.length){
    this.idquestion = this.Questions[this.compteurQuestion]['id'];
    this.reponseservice.getReponsesByQuestionId(this.idquestion).subscribe((data: {}) => {
      this.Reponses=data
  })}
  this.ChoixUser = [];
  }
  verifchecked(reponse_id){
    let checkedvar=false;
    let checked = JSON.parse(localStorage.getItem('reponsechecked'));
    checked.forEach(element => {
      if(element['reponse']===reponse_id){
        checkedvar = true
        return true;
        
       
      }
      
    });
  return checkedvar ;
  }
  async submit(){
    this.ChoixUser.forEach(element => {
      this.choix_userService.createupdateChoix_user(element).subscribe((data: {}) => {
    })
    });
    if(this.compteurQuestion==this.Questions.length){
    this.idquestion = this.Questions[this.compteurQuestion-1]['id'];
    this.reponseservice.getReponsesByQuestionId(this.idquestion).subscribe((data: {}) => {
  })}
  this.ChoixUser = [];
  await this.delay(300);
    let utilisateurtest = new UtilisateurTest ;
    utilisateurtest.utilisateur=this.iduser;
    utilisateurtest.test=this.id;
    console.log('idtest='+utilisateurtest)
    this.utilisateurtestService.createUtilisateurTest(utilisateurtest).subscribe((data: {}) => {
      this.resultat = data['score'] ;
      this.essai_id = data['num_essai']
      this.flagechecsucces = data['flagechecsucces']
      this.reponse_correcte = data['nb_reponses_correctes']
      this.question_non_repondues = data['nb_questions_non_repondues']
      this.question_repondues = data['nb_questions_repondues']
      this.nb_reponse_incorrectes = data['nb_reponse_incorrectes']
     
    })
    this.completedscore = true ;
  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

countdownonFinished(event){
  if (event.action == "done") { this.submit(); }
  
}
}










