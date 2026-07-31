import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService, CaseStudy } from '../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
})
export class ProjectsListComponent {
  private readonly svc = inject(ProjectsService);

  /** Flat list used by the carousel — same data as case studies */
  readonly projects: CaseStudy[] = this.svc.projects;

  activeIndex = 0;
  animating   = false;

  getOffset(i: number): number {
    const n    = this.projects.length;
    let   diff = i - this.activeIndex;
    if (diff >  Math.floor(n / 2)) diff -= n;
    if (diff < -Math.floor(n / 2)) diff += n;
    return diff;
  }

  next(): void {
    if (this.animating) return;
    this.animating = true;
    this.activeIndex = (this.activeIndex + 1) % this.projects.length;
    setTimeout(() => (this.animating = false), 550);
  }

  prev(): void {
    if (this.animating) return;
    this.animating = true;
    this.activeIndex =
      (this.activeIndex - 1 + this.projects.length) % this.projects.length;
    setTimeout(() => (this.animating = false), 550);
  }

  goTo(index: number): void {
    if (this.animating || index === this.activeIndex) return;
    this.animating = true;
    this.activeIndex = index;
    setTimeout(() => (this.animating = false), 550);
  }

  private dragStartX = 0;
  private dragging   = false;

  onDragStart(e: MouseEvent | TouchEvent): void {
    this.dragStartX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    this.dragging   = true;
  }

  onDragEnd(e: MouseEvent | TouchEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    const endX  = e instanceof TouchEvent ? e.changedTouches[0].clientX : e.clientX;
    const delta = this.dragStartX - endX;
    if (delta >  55) this.next();
    if (delta < -55) this.prev();
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft')  this.prev();
  }
}
