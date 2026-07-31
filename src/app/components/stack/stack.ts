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

export interface StackCard {
  id: number;
  domain: string;
  period: string;
  icon: string;
  iconBg: string;
  accentColor: string;
  headline: string;
  description: string;
  skills: { name: string; level: 'expert' | 'proficient' | 'familiar' }[];
  highlights: string[];
  projects: string[];
  size: 'large' | 'medium' | 'small';
}

@Component({
  selector: 'app-stack',
  imports: [CommonModule],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class StackComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('stackCard') cardRefs!: QueryList<ElementRef<HTMLElement>>;
  visibleCards = signal<Set<number>>(new Set());

  cards: StackCard[] = [
    {
      id: 0,
      domain: 'Mobile Development',
      period: '2022 – Present',
      icon: '📱',
      iconBg: 'rgba(109,94,247,0.12)',
      accentColor: '#6D5EF7',
      headline: 'Flutter & Dart',
      description: 'Production mobile apps with Flutter.',
      skills: [
        { name: 'Flutter', level: 'expert' },
        { name: 'Dart', level: 'expert' },
        { name: 'BLoC', level: 'expert' },
        { name: 'Animations', level: 'expert' },
        { name: 'REST APIs', level: 'expert' },
      ],
      highlights: [
        'Healthcare app',
        'English learning',
        'Food rewards',
      ],
      projects: ['Healthcare Platform', 'English Learning App', 'Food Rewards App'],
      size: 'large',
    },
    {
      id: 1,
      domain: 'Web Development',
      period: '2022 – Present',
      icon: '🌐',
      iconBg: 'rgba(244,114,182,0.12)',
      accentColor: '#F472B6',
      headline: 'Angular & JavaScript',
      description: 'Reactive web apps with Angular.',
      skills: [
        { name: 'Angular', level: 'proficient' },
        { name: 'TypeScript', level: 'proficient' },
        { name: 'RxJS', level: 'proficient' },
        { name: 'SCSS', level: 'expert' },
      ],
      highlights: [
        'Coworking reservation',
        'Learning platform',
      ],
      projects: ['Coworking Seat System', 'English Learning Platform'],
      size: 'medium',
    },
    {
      id: 2,
      domain: 'Robotics & AI',
      period: '2018 – 2022',
      icon: '🤖',
      iconBg: 'rgba(52,211,153,0.12)',
      accentColor: '#34D399',
      headline: 'Robotics Systems',
      description: 'Autonomous competition robots.',
      skills: [
        { name: 'ROS', level: 'proficient' },
        { name: 'Python', level: 'proficient' },
        { name: 'C++', level: 'proficient' },
        { name: 'Computer Vision', level: 'proficient' },
      ],
      highlights: [
        '🥉 3rd global (2021)',
        '🥇 1st Iran',
      ],
      projects: ['AT WORK Robot Platform'],
      size: 'medium',
    },
    {
      id: 3,
      domain: 'Backend & Data',
      period: '2022 – Present',
      icon: '⚡',
      iconBg: 'rgba(245,158,11,0.12)',
      accentColor: '#F59E0B',
      headline: 'Backend Services',
      description: 'Firebase, APIs & offline storage.',
      skills: [
        { name: 'Firebase', level: 'proficient' },
        { name: 'REST APIs', level: 'expert' },
        { name: 'Local Storage', level: 'proficient' },
      ],
      highlights: [
        'Offline-first',
        'Real-time chat',
      ],
      projects: ['Healthcare Platform', 'Education Platform'],
      size: 'medium',
    },
    {
      id: 4,
      domain: 'Machine Learning',
      period: '2023 – Present',
      icon: '🧠',
      iconBg: 'rgba(124,58,237,0.12)',
      accentColor: '#7C3AED',
      headline: 'ML & Data Science',
      description: 'Learning ML fundamentals.',
      skills: [
        { name: 'Python', level: 'proficient' },
        { name: 'ML Algorithms', level: 'familiar' },
      ],
      highlights: [
        'Data pipelines',
        'Model training',
      ],
      projects: ['Personal ML Projects'],
      size: 'small',
    },
    {
      id: 5,
      domain: 'Engineering',
      period: '2018 – 2022',
      icon: '🔬',
      iconBg: 'rgba(109,94,247,0.08)',
      accentColor: '#6D5EF7',
      headline: 'Biomedical Engineering',
      description: 'B.Sc. in Biomedical Eng.',
      skills: [
        { name: 'C++', level: 'proficient' },
        { name: 'MATLAB', level: 'proficient' },
      ],
      highlights: [
        'Problem solving',
        'Signal processing',
      ],
      projects: ['University Projects'],
      size: 'small',
    },
    {
      id: 6,
      domain: 'Dev Tools',
      period: '2022 – Present',
      icon: '⚙️',
      iconBg: 'rgba(100,116,139,0.1)',
      accentColor: '#64748B',
      headline: 'Workflow & Tools',
      description: 'Git, CI/CD & collaboration.',
      skills: [
        { name: 'Git/GitHub', level: 'expert' },
        { name: 'CI/CD', level: 'proficient' },
        { name: 'Figma', level: 'proficient' },
      ],
      highlights: [
        'Automated deployments',
        'Design collaboration',
      ],
      projects: ['All Projects'],
      size: 'small',
    },
  ];

  // Level label helpers
  levelLabel: Record<string, string> = {
    expert: 'Expert',
    proficient: 'Proficient',
    familiar: 'Familiar',
  };

  levelWidth: Record<string, string> = {
    expert: '90%',
    proficient: '65%',
    familiar: '38%',
  };

  ngAfterViewInit(): void {
    setTimeout(() => this.checkCards(), 200);
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  checkCards(): void {
    const vh = window.innerHeight;
    this.cardRefs.forEach((ref, i) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (rect.top < vh * 0.88) {
        this.visibleCards.update(prev => {
          if (prev.has(i)) return prev;
          return new Set([...prev, i]);
        });
      }
    });
  }

  isVisible(i: number): boolean {
    return this.visibleCards().has(i);
  }
}
