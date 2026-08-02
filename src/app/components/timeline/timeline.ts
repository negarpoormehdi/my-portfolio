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
      year: 2018,
      side: 'right',
      role: 'Electronics & Software Member',
      company: 'AT WORK Robotics Team',
      cards: [
        {
          id: 501,
          title: 'Joined AT WORK Robotics',
          description: 'Joined as an electronics member in my first year running in parallel with the Biomedical Engineering degree.',
          tech: ['ROS', 'Python', 'C++', 'Electronics', 'MATLAB'],
          detail: 'Where I first stepped into programming and AI not because I\'d mastered them there, but because that\'s where the door opened.',
        },
      ],
    },
    {
      year: 2021,
      side: 'left',
      role: 'Electronics & Software Member',
      company: 'AT WORK RoboCup Asia-Pacific, Aichi Japan',
      cards: [
        {
          id: 401,
          title: '3rd Place RoboCup@Work Asia-Pacific',
          description: 'Autonomous robot competing in Aichi, Japan perceiving environment, planning paths, manipulating objects in real time.',
          tech: ['ROS', 'Python', 'C++', 'Computer Vision', 'Sensor Fusion'],
          detail: 'Also: 1st Place IranOpen Tehran 2022, 1st Place IranOpen Kish Island 2018, Sydney Technical Challenge 2019.',
        },
      ],
    },
    {
      year: 2022,
      side: 'right',
      role: 'Frontend Developer',
      company: 'SRC Software Company',
      cards: [
        {
          id: 301,
          title: 'Graduated & Joined SRC',
          description: 'Started in Angular and JavaScript. Most colleagues were CS graduates; picked up a lot on the job.',
          tech: ['Angular', 'TypeScript', 'JavaScript', 'SVG'],
          detail: 'First delivered product: Ozone a coworking seat-reservation system including the admin side.',
        },
        {
          id: 302,
          title: 'Moved into Flutter',
          description: 'After the first project, the team needed someone on mobile moved into Flutter and Dart.',
          tech: ['Flutter', 'Dart', 'REST API', 'Firebase'],
          detail: 'Consistent architecture throughout: BLoC and Provider for state, MVVM with a Repository pattern.',
        },
      ],
    },
    {
      year: 2023,
      side: 'left',
      role: 'Mobile & Frontend Engineer',
      company: 'SRC Software Company',
      cards: [
        {
          id: 201,
          title: 'AKSSI & Polylo Delivery',
          description: 'Healthcare platform (AKSSI) and language learning platform (Polylo) shipped to App Store & Google Play.',
          tech: ['Flutter', 'Dart', 'Angular', 'Firebase', 'BLoC', 'Java', 'Swift'],
          detail: 'Four features in AKSSI built from scratch where Flutter packages couldn\'t keep up: video calls, Bina camera vitals, health graph, interactive body map.',
        },
        {
          id: 202,
          title: 'Independent LLM Study',
          description: 'Building LLMs from scratch in PyTorch tensors through a small GPT-style Transformer.',
          tech: ['PyTorch', 'Python', 'Transformers', 'NLP'],
          detail: 'Most of the earlier project work predates the current AI wave; this study came later, deliberately.',
        },
      ],
    },
    {
      year: 2025,
      side: 'right',
      role: 'AI Integration Engineer',
      company: 'Pollett AI Role',
      cards: [
        {
          id: 101,
          title: 'Pollett AI Features',
          description: '"Pollett Liveness" on-device face authentication with TensorFlow Lite. "Polly" in-app AI assistant.',
          tech: ['TensorFlow Lite', 'Flutter', 'Dart', 'Prompt Engineering'],
          detail: 'Alongside learning LLM integration more broadly. Published on Google Play.',
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
