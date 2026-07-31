import {
  Component,
  AfterViewInit,
  OnDestroy,
  signal,
  QueryList,
  ViewChildren,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimelineCard {
  id: number;
  title: string;
  description: string;
  tech: string[];
  detail: string;
}

export interface TimelineYear {
  year: number;
  side: 'left' | 'right';
  role: string;
  company: string;
  cards: TimelineCard[];
}

@Component({
  selector: 'app-timeline',
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('tlRow') rowRefs!: QueryList<ElementRef<HTMLElement>>;

  openCards      = signal<Set<number>>(new Set());
  visibleRows    = signal<Set<number>>(new Set());
  sectionOpacity = signal(1);
  sectionScale   = signal(1);

  timeline: TimelineYear[] = [
    {
      year: 2022,
      side: 'left',
      role: 'Junior Frontend Dev',
      company: 'Bright Web Agency',
      cards: [
        {
          id: 501,
          title: 'First Production App',
          description: 'Angular app for healthcare client.',
          tech: ['Angular', 'TypeScript', 'SCSS', 'RxJS'],
          detail: 'Learned reactive programming.',
        },
      ],
    },
    {
      year: 2023,
      side: 'right',
      role: 'Mid-Level Developer',
      company: 'Pulse Interactive Agency',
      cards: [
        {
          id: 401,
          title: 'E-commerce Rebuild',
          description: 'Flutter app — +60% performance.',
          tech: ['Flutter', 'Firebase', 'Stripe', 'Push Notifications'],
          detail: 'Offline-first architecture.',
        },
      ],
    },
    {
      year: 2024,
      side: 'left',
      role: 'Senior Flutter Engineer',
      company: 'Global Fintech Solutions',
      cards: [
        {
          id: 301,
          title: 'Scalable Architecture',
          description: 'Micro-frontend, -40% load time.',
          tech: ['Flutter', 'Dart', 'GetX', 'REST API', 'CI/CD'],
          detail: 'Contract-first APIs.',
        },
        {
          id: 302,
          title: 'Custom Animations',
          description: 'Gesture-based navigation.',
          tech: ['Dart', 'BLoC', 'Custom Painter', 'REST API'],
          detail: '99.9% crash-free.',
        },
      ],
    },
    {
      year: 2025,
      side: 'right',
      role: 'Senior Flutter Engineer',
      company: 'Apex Mobile Studios',
      cards: [
        {
          id: 201,
          title: 'Super App',
          description: '500k+ DAUs, zero downtime.',
          tech: ['Flutter', 'Dart', 'BLoC', 'Hive', 'Firebase'],
          detail: 'Modular structure, -35% build time.',
        },
        {
          id: 202,
          title: 'Animation Engine',
          description: '120fps transitions.',
          tech: ['Flutter', 'CustomPainter', 'AnimationController', 'Rive'],
          detail: 'Open-sourced, 1.2k GitHub stars.',
        },
      ],
    },
    {
      year: 2026,
      side: 'left',
      role: 'Lead Frontend Architect',
      company: 'Nova Digital Labs',
      cards: [
        {
          id: 101,
          title: 'Design System',
          description: 'Used by 12 teams, -70% UI issues.',
          tech: ['Angular', 'SCSS', 'Storybook', 'Figma Tokens'],
          detail: 'Visual regression testing.',
        },
        {
          id: 102,
          title: 'AI Dashboard',
          description: 'LLM-powered analytics.',
          tech: ['Angular', 'D3.js', 'WebSocket', 'OpenAI API'],
          detail: '8 min → 30 sec insight time.',
        },
      ],
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => this.checkVisibility(), 100);
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  checkVisibility(): void {
    const vh = window.innerHeight;

    // ── Section fade-out ──────────────────────────────────
    const el = document.getElementById('timeline');
    if (el) {
      const rect       = el.getBoundingClientRect();
      const leaveStart = -vh * 0.55;
      const leaveEnd   = -vh * 1.2;
      if (rect.top > leaveStart) {
        this.sectionOpacity.set(1);
        this.sectionScale.set(1);
      } else {
        const progress = Math.min(
          Math.max((rect.top - leaveStart) / (leaveEnd - leaveStart), 0), 1
        );
        this.sectionOpacity.set(1 - progress);
        this.sectionScale.set(1 - progress * 0.06);
      }
    }

    // ── Row scroll-in ─────────────────────────────────────
    this.rowRefs.forEach((ref, index) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (rect.top < vh * 0.75) {
        this.visibleRows.update((prev) => {
          if (prev.has(index)) return prev;
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      }
    });
  }

  isVisible(index: number): boolean {
    return this.visibleRows().has(index);
  }

  toggle(id: number): void {
    this.openCards.update((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isOpen(id: number): boolean {
    return this.openCards().has(id);
  }
}
