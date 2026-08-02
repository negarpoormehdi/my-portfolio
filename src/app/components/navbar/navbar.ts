import { Component, inject, OnInit, OnDestroy, signal, HostListener } from '@angular/core';
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
  menuOpen   = signal(false);
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
        this.menuOpen.set(false);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.menuOpen.set(false);
  }

  isActive(link: NavLink): boolean {
    if (link.fragment) return false;
    if (link.route === '/') {
      return this.currentUrl === '/' || this.currentUrl === '';
    }
    return this.currentUrl.startsWith(link.route);
  }
}
