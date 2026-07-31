import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectsComponent } from './pages/projects/projects';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';

export const routes: Routes = [
  { path: '',                    component: HomeComponent },
  { path: 'projects',            component: ProjectsComponent },
  { path: 'projects/:slug',      component: ProjectDetailComponent },
  { path: '**',                  redirectTo: '' },
];
