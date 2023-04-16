import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService, QuestionsService, ReponsesService, TestsService, UserService } from '../services';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.component.html',
  styleUrls: ['./dashboardadmin.component.css']
})
export class DashboardadminComponent implements OnInit {
  Categories: any = [];
  Tests: any = [];
  Questions :any = [];
  Reponses:any = [];
  registerForm: FormGroup;
  submitted = false;
  registerFormTest:FormGroup;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  progress1 = 0;
  messagereponse = '';
  messagequestionreponse = '';
  usertoken:string
  constructor( public categorieservice: CategorieService,
    public testservice: TestsService,public  questionservice: QuestionsService ,
    public reponseservice:ReponsesService,
    private formBuilder: FormBuilder,
    private testutilisateur: UserService,
    private router: Router) {
  
   }

   ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      titre: ['',Validators.required],
    
  } );

  this.registerFormTest = this.formBuilder.group({
    titre: ['',Validators.required],
    description: ['',Validators.required],
    nb_questions: ['',Validators.required],
    nb_minutes: ['',Validators.required],
    score_min: ['',Validators.required],
    categorie: ['',Validators.required],
    code_test: ['',Validators.required],
  
}, );
    this.usertoken = sessionStorage.getItem('currentUserToken');
    if(this.usertoken==undefined){
      this.router.navigate(['/test/login']);
    }else { 
    
    this.testutilisateur.getByToken(this.usertoken).subscribe((data: any) => {
      console.log(data)
      if(data.is_superuser==true){
        this.loadCategories();
        this.loadTests();
        this.loadQuestions();
        this.loadReponses()
    
        
        
      } else { this.router.navigate(['/test/login']);}
     
    
    })
  }

  }

  loadCategories() {
    return this.categorieservice.getCategorie().subscribe((data: {}) => {
      this.Categories = data;
    })
  }


  loadTests() {
    return this.testservice.getTests().subscribe((data: {}) => {
      this.Tests = data;
    })
  }

  loadQuestions() {
    return this.questionservice.getQuestions().subscribe((data: {}) => {
      this.Questions = data;
    })
  }

  loadReponses() {
    return this.reponseservice.getReponses().subscribe((data: {}) => {
      this.Reponses = data;
    })
  }

  onSubmit() {

    

    // stop here if form is invalid
    

    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

    this.categorieservice.createCategorie(this.registerForm.value)
      
        .subscribe(
         
            data  => {
              this.loadCategories()
              this.registerForm.reset();
               alert("Ajout avec success");
            },
            
         );
        
}


onSubmitTest() {
  // stop here if form is invalid
  

  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

  this.testservice.createEmployee(this.registerFormTest.value)
    
      .subscribe(
       
          data  => {
            this.loadTests()
            this.registerFormTest.reset();
             alert("Ajout avec success");
          },
          
       );
}


selectFile(event) {
  this.selectedFiles = event.target.files;
}



uploadquestionreponse() {
  this.progress1 = 0;

  this.currentFile = this.selectedFiles.item(0);
  this.testservice.upload(this.currentFile).subscribe(
    event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress1 = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.loadQuestions()
        this.messagequestionreponse = event.body.message;
        this.messagequestionreponse = 'ajout avec success';
        
      }
    },
    err => {
      this.progress1 = 0;
      this.messagequestionreponse = 'Could not upload the file!';
      this.currentFile = undefined;
    });

  this.selectedFiles = undefined;
}

}
