import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

interface NavLink {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  theme = inject(ThemeService);

  navLinks: NavLink[] = [
    { label: 'Timeline', route: '/', fragment: 'timeline' },
    { label: 'Projects', route: '/projects' },
    { label: 'Stack',    route: '/', fragment: 'stack' },
    { label: 'Contact',  route: '/', fragment: 'contact' },
  ];
}
