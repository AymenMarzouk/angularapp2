import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestsService } from '../services';

@Component({
  selector: 'app-detailtest',
  templateUrl: './detailtest.component.html',
  styleUrls: ['./detailtest.component.css']
})
export class DetailtestComponent implements OnInit {

  test: any ={};
  tests:any=[];
  id: number;
  @Input() showDetails: boolean;
  constructor(private testservice: TestsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.testservice.getTestsById(this.id).subscribe((data: {}) => {
      
      
      this.test=data[0]
      
      this.testservice.getTestsBycategorieId(this.test.categorie.id).subscribe((data: {}) => {
     
        this.tests=data;
       
    })

  })
    /*this.testservice.getTestsBycategorieId(this.test.categorie).subscribe((data: {}) => {
     
      this.test=data[0]
    })*/

   
  }

  getquestionsbyidtest(id:number){
    this.router.navigate(['/test/quiz', id]); 
  }
  getidtest(id:number){
    /*this.router.navigate(['/test', id]); */
    this.router.navigate(['/test/categorie', id]); 
  }
 
}
