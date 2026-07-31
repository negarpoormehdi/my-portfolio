import {
  Component,
  AfterViewInit,
  OnDestroy,
  signal,
  HostListener,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyMapComponent } from '../journey-map/journey-map';

@Component({
  selector: 'app-about',
  imports: [CommonModule, JourneyMapComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('stepEl') stepElements!: QueryList<ElementRef<HTMLElement>>;

  sectionVisible = signal(false);
  // Each step is independently visible
  visibleSteps   = signal<Set<number>>(new Set([0])); // first is always on

  waving = signal(false);
  private waveInterval: ReturnType<typeof setInterval> | null = null;

  floatingItems = signal<number[]>([]);
  private floatTimer: ReturnType<typeof setTimeout> | null = null;

  steps = [
    {
      icon: '🎓',
      year: '2018–2022',
      title: 'Biomedical Engineering',
      place: 'University',
      desc: 'Started with a passion for science and human biology — circuits, signals, systems. Fell in love with the intersection of tech and life.',
      emoji: '🧬',
    },
    {
      icon: '🤖',
      year: '2022–2023',
      title: 'MRL Robotics Lab',
      place: 'Research Lab',
      desc: 'Joined MRL, one of Iran\'s top robotics labs. Working on robot behavior, sensors, and real-time control. This is where code first felt like magic.',
      emoji: '🦾',
    },
    {
      icon: '💻',
      year: '2023',
      title: 'Fell in Love with Code',
      place: 'The Turning Point',
      desc: 'One late night debugging a robot controller, everything clicked. Switched focus to Flutter and Angular — never looked back.',
      emoji: '✨',
    },
    {
      icon: '🚀',
      year: '2024–Now',
      title: 'Full-Stack Mobile Dev',
      place: 'Building Products',
      desc: 'Shipping high-performance apps used by thousands. The girl who started with anatomy books now architects clean, scalable mobile systems.',
      emoji: '🎯',
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => this.check(), 150);
    this.waveInterval = setInterval(() => {
      this.waving.set(true);
      setTimeout(() => this.waving.set(false), 1000);
    }, 3500);
  }

  ngOnDestroy(): void {
    if (this.waveInterval) clearInterval(this.waveInterval);
    if (this.floatTimer)   clearTimeout(this.floatTimer);
  }

  @HostListener('window:scroll')
  check(): void {
    const vh = window.innerHeight;
    const trigger = vh * 0.78; // trigger when element crosses 78% of viewport

    // Section entrance
    const section = document.getElementById('about');
    if (section && !this.sectionVisible()) {
      if (section.getBoundingClientRect().top < vh * 0.88) {
        this.sectionVisible.set(true);
      }
    }

    // Activate each step independently when it enters viewport
    this.stepElements?.forEach((ref, i) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (rect.top < trigger) {
        this.visibleSteps.update(prev => {
          if (prev.has(i)) return prev;
          const next = new Set(prev);
          next.add(i);
          return next;
        });
      }
    });
  }

  isStepVisible(i: number): boolean {
    return this.visibleSteps().has(i);
  }

  onCharacterClick(): void {
    const ids = Array.from({ length: 6 }, (_, i) => i);
    this.floatingItems.set(ids);
    if (this.floatTimer) clearTimeout(this.floatTimer);
    this.floatTimer = setTimeout(() => this.floatingItems.set([]), 1800);
  }
}
