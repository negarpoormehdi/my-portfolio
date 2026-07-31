import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {

  // ── Smooth scroll-out state ───────────────────────────────
  /** 0 → fully visible, 1 → fully gone */
  scrollProgress = signal(0);

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollY    = window.scrollY;
    const vh         = window.innerHeight;
    // Start fading at 5% scroll, complete at 65% of viewport height
    const start      = vh * 0.05;
    const end        = vh * 0.65;
    const raw        = (scrollY - start) / (end - start);
    const progress   = Math.max(0, Math.min(1, raw));
    this.scrollProgress.set(progress);
  }

  // ── Typing animation ─────────────────────────────────────
  private readonly names = [
    'Negar Poormehdi',
    'a Flutter Developer',
    'a Web Architect',
    'a Creative Builder',
  ];
  private nameIndex  = 0;
  private charIndex  = 0;
  private isDeleting = false;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  displayedName = signal('');
  showCursor    = signal(true);

  private cursorInterval: ReturnType<typeof setInterval> | null = null;

  skills = [
    'Flutter', 'Angular', 'Dart', 'TypeScript',
    'Firebase', 'REST API', 'Git', 'Kotlin',
  ];

  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    this.startTyping();
    this.cursorInterval = setInterval(() => {
      this.showCursor.update(v => !v);
    }, 530);
  }

  ngOnDestroy(): void {
    if (this.typeTimer)      clearTimeout(this.typeTimer);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  // ── Typing logic ─────────────────────────────────────────
  private startTyping(): void {
    const current        = this.names[this.nameIndex];
    const typeSpeed      = 90;
    const deleteSpeed    = 55;
    const pauseAfterType = 1800;
    const pauseAfterDel  = 400;

    if (!this.isDeleting) {
      this.charIndex++;
      this.displayedName.set(current.slice(0, this.charIndex));

      if (this.charIndex === current.length) {
        this.typeTimer = setTimeout(() => {
          this.isDeleting = true;
          this.startTyping();
        }, pauseAfterType);
        return;
      }
    } else {
      this.charIndex--;
      this.displayedName.set(current.slice(0, this.charIndex));

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.nameIndex  = (this.nameIndex + 1) % this.names.length;
        this.typeTimer  = setTimeout(() => this.startTyping(), pauseAfterDel);
        return;
      }
    }

    this.typeTimer = setTimeout(
      () => this.startTyping(),
      this.isDeleting ? deleteSpeed : typeSpeed
    );
  }
}
