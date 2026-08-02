import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Subscription, filter } from 'rxjs';

interface NavLink {
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  theme  = inject(ThemeService);
  router = inject(Router);

  currentUrl = '';
  private sub!: Subscription;

  navLinks: NavLink[] = [
    { label: 'Home',     route: '/' },
    { label: 'Timeline', route: '/', fragment: 'timeline' },
    { label: 'Projects', route: '/projects' },
    { label: 'Stack',    route: '/', fragment: 'stack' },
    { label: 'Contact',  route: '/', fragment: 'contact' },
  ];

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.currentUrl = e.urlAfterRedirects;
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isActive(link: NavLink): boolean {
    if (link.fragment) {
      // fragment links are never "active" they're just scroll anchors
      return false;
    }
    if (link.route === '/') {
      // Home is active only when exactly on '/' (no sub-routes)
      return this.currentUrl === '/' || this.currentUrl === '';
    }
    // Other routes (e.g. /projects) active when URL starts with the route
    return this.currentUrl.startsWith(link.route);
  }
}
