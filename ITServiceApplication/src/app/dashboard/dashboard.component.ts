import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, LineController, BarController, PieController, LineElement, BarElement, PointElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ProjectService } from '../services/project.service';
import { ProjectBranchService } from '../services/project-branch.service';
import { ProjectModuleService } from '../services/project-module.service';

Chart.register(
  LineController, BarController, PieController,
  LineElement, BarElement, PointElement, ArcElement,
  CategoryScale, LinearScale,
  Title, Tooltip, Legend
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  projectCount: any[]=[];
  branchCount:any[]=[];
  moduleCount:any[]=[];

  @ViewChild('empBasedOnManagerChart') empBasedOnManagerChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('projectBranchCountChart') projectBranchCountChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('projectModuleCountChart') projectModuleCountChart!: ElementRef<HTMLCanvasElement>;

  constructor(private projectService: ProjectService, private branchService:ProjectBranchService, private moduleService:ProjectModuleService) {}

  ngOnInit(): void {
    this.getProjectCount();
    this.getBranchCount();
    this.getModuleCount();
    
    
  }

  ngAfterViewInit(): void {}

  getProjectCount() {
    this.projectService.getProjectCount().subscribe({
      next: (data) => {
        this.projectCount = data;
        this.projectCountChart(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  getBranchCount(){
    this.branchService.getBranchCount().subscribe({
      next:(data)=>{
        this.branchCount=data;
        this.branchCountChart();
      }
    })
  }



  getModuleCount(){
    this.moduleService.getModuleCount().subscribe({
      next:(data)=>{
        this.moduleCount=data;
        console.log(data);
        this.moduleCountChart();
      }
    })
  }



  projectCountChart(): void {
    if (!this.empBasedOnManagerChart || !this.empBasedOnManagerChart.nativeElement) {
      console.error('Canvas element #empBasedOnManagerChart not available.');
      return;
    }

    const ctx = this.empBasedOnManagerChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Unable to get context from the canvas');
      return;
    }

    const rolesData = this.projectCount.reduce((acc, cur) => {
      const managerName = `${cur.firstName} ${cur.lastName}`;
      acc[managerName] = (acc[managerName] || 0) + cur.numberOfProjects;
      return acc;
    }, {});

    const roleChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(rolesData),
        datasets: [{
          label: '# of Projects',
          data: Object.values(rolesData),
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }







  branchCountChart(): void {
    if (!this.projectBranchCountChart || !this.projectBranchCountChart.nativeElement) {
      console.error('Canvas element #projectBranchCountChart not available.');
      return;
    }

    const ctx = this.projectBranchCountChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Unable to get context from the canvas');
      return;
    }

    const projectBranchCount = this.branchCount.reduce((acc, cur) => {
      const projectName = `${cur.projectName}`;
      acc[projectName] = (acc[projectName] || 0) + cur.numberOfBranches;
      return acc;
    }, {});

    const branchCountChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(projectBranchCount),
        datasets: [{
          label: '# of Branch',
          data: Object.values(projectBranchCount),
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }









  moduleCountChart(): void {
    if (!this.projectModuleCountChart || !this.projectModuleCountChart.nativeElement) {
      console.error('Canvas element #projectModuleCountChart not available.');
      return;
    }

    const ctx = this.projectModuleCountChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Unable to get context from the canvas');
      return;
    }

    const projectModuleCount = this.moduleCount.reduce((acc, cur) => {
      const projectName = `${cur.projectName}`;
      acc[projectName] = (acc[projectName] || 0) + cur.numberOfModule;
      return acc;
    }, {});

    const moduleCountChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(projectModuleCount),
        datasets: [{
          label: '# of Module',
          data: Object.values(projectModuleCount),
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }
    });
  }






}
