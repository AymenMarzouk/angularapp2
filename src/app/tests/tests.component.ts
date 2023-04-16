import { Component, OnInit, Input } from '@angular/core';
import { TestsService, CategorieService } from '../services';
import { CategoriesComponent } from '../categories/categories.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  Tests: any = [];
  id: number;
  constructor(
    private testservice: TestsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.testservice.getTestsBycategorieId(this.id).subscribe((data: {}) => {
        this.Tests=data
    })
    //this.Tests = this.categoriecomp.getTests();
   // this.loadTests()
   
  }
// Get Categories list
loadTests() {
  return this.testservice.getTests().subscribe((data: {}) => {
    this.Tests = data;
  })
}
getquestionsbyidtest(id:number){
  this.router.navigate(['/test/quiz', id]); 
}
getidtest(id:number){
  this.router.navigate(['/test/test', id]); 
}
}
