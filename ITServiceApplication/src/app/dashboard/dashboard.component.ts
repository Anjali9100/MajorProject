import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, LineController, BarController, PieController, LineElement, BarElement, PointElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ProjectService } from '../services/project.service';

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
  empCount: any[]=[];
  @ViewChild('empBasedOnManagerChart') empBasedOnManagerChart!: ElementRef<HTMLCanvasElement>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjectCount();
  }

  ngAfterViewInit(): void {}

  getProjectCount() {
    this.projectService.getProjectCount().subscribe({
      next: (data) => {
        this.empCount = data;
        console.log(data);
        this.setupRoleChart();  // Setup chart after data is available
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  setupRoleChart(): void {
    if (!this.empBasedOnManagerChart || !this.empBasedOnManagerChart.nativeElement) {
      console.error('Canvas element #empBasedOnManagerChart not available.');
      return;
    }

    const ctx = this.empBasedOnManagerChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Unable to get context from the canvas');
      return;
    }

    // Process data to get counts per role
    const rolesData = this.empCount.reduce((acc, cur) => {
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
}
