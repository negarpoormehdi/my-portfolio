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
      icon: 'smartphone',
      iconBg: 'rgba(109,94,247,0.12)',
      accentColor: '#6D5EF7',
      headline: 'Flutter & Dart',
      description: 'Flutter as the main tool since 2022. BLoC and Provider for state, MVVM with a Repository pattern underneath.',
      skills: [
        { name: 'Flutter', level: 'expert' },
        { name: 'Dart', level: 'expert' },
        { name: 'BLoC / Provider', level: 'expert' },
        { name: 'REST APIs', level: 'expert' },
        { name: 'Firebase', level: 'proficient' },
      ],
      highlights: [
        'AKSSI healthcare platform',
        'Polylo language learning',
        'Pinup food rewards',
        'Pollett social polling',
      ],
      projects: ['AKSSI', 'Polylo', 'Pinup', 'Pollett'],
      size: 'large',
    },
    {
      id: 1,
      domain: 'Web Development',
      period: '2022 – Present',
      icon: 'language',
      iconBg: 'rgba(244,114,182,0.12)',
      accentColor: '#F472B6',
      headline: 'Angular & TypeScript',
      description: 'Angular alongside Flutter mobile builds when a project needs both.',
      skills: [
        { name: 'Angular', level: 'proficient' },
        { name: 'TypeScript', level: 'proficient' },
        { name: 'JavaScript', level: 'proficient' },
        { name: 'SCSS', level: 'expert' },
      ],
      highlights: [
        'Ozone coworking reservation system',
        'Polylo teacher & admin web panel',
      ],
      projects: ['Ozone', 'Polylo'],
      size: 'medium',
    },
    {
      id: 2,
      domain: 'Robotics & AI',
      period: '2018 – 2022',
      icon: 'precision_manufacturing',
      iconBg: 'rgba(52,211,153,0.12)',
      accentColor: '#34D399',
      headline: 'Autonomous Robotics',
      description: '1st Place IranOpen 2022 & 2018 · 3rd Place RoboCup Asia-Pacific 2021',
      skills: [
        { name: 'ROS', level: 'proficient' },
        { name: 'Python', level: 'proficient' },
        { name: 'C++', level: 'proficient' },
        { name: 'Computer Vision', level: 'proficient' },
      ],
      highlights: [
        '1st Place IranOpen 2022 & 2018',
        '3rd Place RoboCup@Work Asia-Pacific 2021',
        'Sydney Technical Challenge 2019',
      ],
      projects: ['AT WORK Robot Platform'],
      size: 'medium',
    },
    {
      id: 3,
      domain: 'Backend & Data',
      period: '2022 – Present',
      icon: 'bolt',
      iconBg: 'rgba(245,158,11,0.12)',
      accentColor: '#F59E0B',
      headline: 'Backend & Native Bridges',
      description: 'Firebase, REST APIs, and native bridges wherever a package couldn\'t be trusted.',
      skills: [
        { name: 'Firebase', level: 'proficient' },
        { name: 'REST APIs', level: 'expert' },
        { name: 'Java (Android)', level: 'familiar' },
        { name: 'Swift (iOS)', level: 'familiar' },
      ],
      highlights: [
        'Native video calls (Java/Swift bridge)',
        'Custom Bina camera vitals integration',
        'Real-time chat & push notifications',
      ],
      projects: ['AKSSI', 'Polylo'],
      size: 'medium',
    },
    {
      id: 4,
      domain: 'Machine Learning',
      period: '2023 – Present',
      icon: 'neurology',
      iconBg: 'rgba(124,58,237,0.12)',
      accentColor: '#7C3AED',
      headline: 'ML & Applied AI',
      description: 'LLMs from scratch in PyTorch; on-device inference with TensorFlow Lite for Pollett.',
      skills: [
        { name: 'PyTorch', level: 'familiar' },
        { name: 'TensorFlow Lite', level: 'familiar' },
        { name: 'Python', level: 'proficient' },
      ],
      highlights: [
        'Independent LLM course GPT-style Transformer',
        'Pollett Liveness on-device face auth',
        'Polly in-app AI assistant',
      ],
      projects: ['Pollett', 'Personal ML Study'],
      size: 'small',
    },
    {
      id: 5,
      domain: 'Engineering',
      period: '2018 – 2022',
      icon: 'biotech',
      iconBg: 'rgba(109,94,247,0.08)',
      accentColor: '#6D5EF7',
      headline: 'Biomedical Engineering',
      description: 'B.Sc. Biomedical Eng. where the hardware/software habit started.',
      skills: [
        { name: 'C++', level: 'proficient' },
        { name: 'MATLAB', level: 'proficient' },
      ],
      highlights: [
        'Signal processing & circuit design',
        'Engineering fundamentals foundation',
      ],
      projects: ['University & Robotics'],
      size: 'small',
    },
    {
      id: 6,
      domain: 'Dev Tools',
      period: '2022 – Present',
      icon: 'build',
      iconBg: 'rgba(100,116,139,0.1)',
      accentColor: '#64748B',
      headline: 'Workflow & Tools',
      description: 'Git, CI/CD, Figma for design handoff.',
      skills: [
        { name: 'Git / GitHub', level: 'expert' },
        { name: 'CI/CD', level: 'proficient' },
        { name: 'Figma', level: 'proficient' },
      ],
      highlights: [
        'Consistent version control across all projects',
        'Design handoff collaboration',
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
