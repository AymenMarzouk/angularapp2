import { Component, OnInit } from '@angular/core';
import { CategorieService, TestsService } from '../services';
import { TestsComponent } from '../tests/tests.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  Categories: any = [];
  public Tests: any = [];
 
  constructor(
    public categorieservice: CategorieService,
    public testservice: TestsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories()
    console.log(this.Categories);
  }
// Get Categories list
loadCategories() {
  return this.categorieservice.getCategorie().subscribe((data: {}) => {
    this.Categories = data;
  })
}
// enter button
gettestsbyidcategorie(id: number) {

  this.router.navigate(['test/categorie', id]); 
 //  this.testservice.getTestsBycategorieId(id).subscribe((data: {}) => {
 //  this.Tests=data

  //})
  //return this.router.navigate(['/tests'],this.Tests); 
}
public getTests(){
  return this.Tests;
}
}
