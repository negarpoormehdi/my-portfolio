import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { ProjectsService, CaseStudy, Asset } from '../../services/projects.service';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetailComponent implements OnInit {
  private route    = inject(ActivatedRoute);
  private svc      = inject(ProjectsService);

  project  = signal<CaseStudy | null>(null);

  readonly backChevron = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>`;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? '';
      this.project.set(this.svc.getBySlug(slug) ?? null);
    });
  }

  otherProjects(currentSlug: string): CaseStudy[] {
    return this.svc.getOthers(currentSlug, 3);
  }

  /** Separate assets by frame type for grouped rendering */
  mobileAssets(p: CaseStudy): Asset[] {
    return p.assets.filter(a => a.type !== 'desktop-mockup' && a.type !== 'scrollable-desktop');
  }

  desktopAssets(p: CaseStudy): Asset[] {
    return p.assets.filter(a => a.type === 'desktop-mockup' || a.type === 'scrollable-desktop');
  }

  /** Returns true if the asset src is a video file */
  isVideo(src: string): boolean {
    return /\.(mp4|webm|ogg|mov)$/i.test(src);
  }
}
