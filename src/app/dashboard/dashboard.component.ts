import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
/*import * as pluginDataLabels from 'chartjs-plugin-datalabels';*/
import { UtilisateurTestService } from '../services/utilisateur-test.service';
/*import { Chart } from 'chart.js';*/

import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs/operators';
import {Chart} from 'node_modules/chart.js';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public canvas: any;
  utilisateurtest: any[];

  chart = [];
  test =[];
  score = [];
  reponse=[];
  chart1 =[];
  chart2 =[];
  chart3 =[];
  Utilisateur:any= [];
  Utilisateur_Tests: any = [];
  idtest: number;
  iduser:number;
  usertoken:string
  @Input() nb: number;
  
  
  constructor(private utilisateurtestService: UtilisateurTestService,private httpClient: HttpClient, 
    private router: Router,private userService: UserService, private testutilisateur:UserService ,
    private route: ActivatedRoute) {}

  ngOnInit()  {
    this.usertoken=sessionStorage.getItem('currentUserToken');
    this.testutilisateur.getByToken(this.usertoken).subscribe((data:any) => {
      this.iduser=data.id
      
    this.loadUtilisateurs(this.iduser);
    this.testutilisateur.getTestUtisateursById(this.iduser).subscribe((data: {}) => {
      this.Utilisateur_Tests=data
  })
  this.testutilisateur.getTestUtisateursById(this.iduser).subscribe((res:any []) => {
        
    /*this.utilisateurtestService.GetUtilisateurTest().subscribe((res: UtilisateurTest[]) => {*/
      res.forEach(y => {
        this.test.push(y.test.code_test);
        this.score.push(y.score);
        this.reponse.push(y.nb_reponses_correctes);
      });
            
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.test ,
          
          datasets: [
            {
              data:this.score,
             label:'Score',
              borderColor: '#33FFBB ',
             backgroundColor:'#33FFBB',
              fill: true
             
              
            },
           {
              data:this.reponse,
              label:'Reponse Correcte',
               borderColor: '#FBA3EB',
              backgroundColor:'#FBA3EB',
               fill: false,
               
               
            }
          ],
          
          
        },
        options: {
          legend: {
            display: true,
            position:'right',
            align:'center',
            labels: {
              
              fontSize:10,
              padding:10,
              fontColor:'#007bff',
              fontFamily:'Helvetica'
          }
            
          },
          scales: {
            xAxes: [{
              display: true,
              
            }],
            yAxes: [{
              display: true
            }],
          },
          title: {
            display: true,
            text: 'Score Test Chart',
            fontColor: 'rgb(255, 99, 132)',
            fontSize:16,
            fontFamily:'Helvetica',
            fontStyle:'bold'

        },
        layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
      },

      animation: {
        
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
        
    },

    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          //Return value for title
          return 'Test: ' + tooltipItems[0].xLabel ;
      },
          labelTextColor: function(tooltipItem, chart) {
              return '#FFFFFF';
          }
      }
  }

        }
      });

      this.chart1 = new Chart('canvas1', {
        type: 'line',
        data: {
          labels: this.test,
          
          
          datasets: [
            {
              data:this.score,
             label:'Score',
              borderColor: '#A3D4FB ',
              backgroundColor:'#A3D4FB ',
              fill: false
             
              
            },
           {
              data:this.reponse,
              label:'Reponse Correcte',
               borderColor: '#FAFBA3',
               backgroundColor:'#FAFBA3',
               fill: false,
               
               
            }
          ],
          
          
        },
        options: {
          legend: {
            display: true,
            position:'right',
            align:'center',
            labels: {
              
              fontSize:10,
              padding:10,
              fontColor:'#007bff',
              fontFamily:'Helvetica'
          }
            
          },
          title: {
            display: true,
            text: 'Score Test Chart',
            fontColor: 'rgb(255, 99, 132)',
            fontSize:16,
            fontFamily:'Helvetica',
            fontStyle:'bold'

        },
        layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
      },

          animation: {
            
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            
        },

        
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          //Return value for title
          return 'Test: ' + tooltipItems[0].xLabel ;
      },
          labelTextColor: function(tooltipItem, chart) {
              return '#FFFFFF';
          }
      }
  }
          
        }
      });


      this.chart2 = new Chart('canvas2', {
        type: 'polarArea',
        data: {
          labels: this.test ,
          
          datasets: [
            {
              data:this.reponse,
             label:'Reponse correcte',
              borderColor: '#FD786B ',
             /*backgroundColor:'#FD786B ',*/
              fill: false
             
              
            }
           
          ],
          
          
        },
        options: {
          legend: {
            display: true,
            position:'right',
            align:'center',
            labels: {
              
              fontSize:10,
              padding:10,
              fontColor:'#007bff',
              fontFamily:'Helvetica'
          }
            
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          },
          title: {
            display: true,
            text: 'Reponse Correct Test Chart',
            fontColor: 'rgb(255, 99, 132)',
            fontSize:16,
            fontFamily:'Helvetica',
            fontStyle:'bold'

        },
        layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
      },

      
      animation: {
        
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
    
},
      
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          //Return value for title
          return 'Reponse correcte: ' + tooltipItems[0].xLabel+ tooltipItems[0].yLabel;
      },
          labelTextColor: function(tooltipItem, chart) {
              return '#FFFFFF';
          }
      }
  }

        }
      });
      
      
      this.chart3 = new Chart('canvas3', {
        type: 'bar',
        data: {
          labels: this.test ,
          
          datasets: [
            {
              data:this.score,
             label:'Score',
              borderColor: '#71F963 ',
             backgroundColor:'#71F963',
              fill: true
             
              
            },
           
          ],
          
          
        },
        options: {
          legend: {
            display: true,
            position:'right',
            align:'center',
            labels: {
              
              fontSize:10,
              padding:10,
              fontColor:'#007bff',
              fontFamily:'Helvetica'
          }
            
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          },
          title: {
            display: true,
            text: 'Score Test Chart',
            fontColor: 'rgb(255, 99, 132)',
            fontSize:16,
            fontFamily:'Helvetica',
            fontStyle:'bold'

        },
        layout: {
          padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
          }
      },

      
      animation: {
        
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
    
},
      
    tooltips: {
      callbacks: {
        title: function(tooltipItems, data) {
          //Return value for title
          return 'Test: ' + tooltipItems[0].xLabel ;
      },
          labelTextColor: function(tooltipItem, chart) {
              return '#FFFFFF';
          }
      }
  }

        }
      });

    });
  

  })
  
    
   
    
   /* this.httpClient.get(this.url).subscribe((res: any[]) => {*/
      

      



    
    
   
  }
  
 
  
  gettestsbyiduser(iduser: number) {

    this.router.navigate(['/dashboard', iduser]); 
  }

  gettestsbyiduser1(iduser: number) {

    this.router.navigate(['/utilisateur_test', iduser]); 
  }

  loadUtilisateurs(id:number) {
    return this.userService.getUsers(id).subscribe((data: {}) => {
      this.Utilisateur = data;
    })
  }

  
  
}