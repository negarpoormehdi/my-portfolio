import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProjectsListComponent } from '../../components/projects-list/projects-list';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-projects',
  imports: [
    NavbarComponent,
    ProjectsListComponent,
    FooterComponent,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {}
