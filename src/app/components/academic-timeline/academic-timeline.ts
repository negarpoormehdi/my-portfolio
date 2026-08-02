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

export interface TimelineTag {
  label: string;
  type: 'tech' | 'field' | 'project' | 'achievement';
}

export interface TimelineEntry {
  id: string;
  period: string;
  shortTitle: string;
  category: string;
  categoryColor: string;
  headline: string;
  description: string;
  tags: TimelineTag[];
  highlights?: string[];
  system?: { label: string; items: string[] }[];
  images?: string[];
  side: 'left' | 'right';
}

@Component({
  selector: 'app-academic-timeline',
  imports: [CommonModule],
  templateUrl: './academic-timeline.html',
  styleUrl: './academic-timeline.scss',
})
export class AcademicTimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('tlEntry') entryRefs!: QueryList<ElementRef<HTMLElement>>;

  visibleEntries = signal<Set<number>>(new Set());
  expandedIds    = signal<Set<string>>(new Set());
  lightboxImage  = signal<string | null>(null);

  entries: TimelineEntry[] = [
    {
      id: 'biomed-start',
      period: '2018',
      shortTitle: 'B.Sc. Biomedical Engineering',
      category: 'Education',
      categoryColor: '#7C3AED',
      headline: 'B.Sc. Biomedical Engineering Islamic Azad University of Qazvin',
      description:
        'Chose Qazvin for its academic environment and active robotics programs the decision that set up everything that followed. Coursework mixed engineering fundamentals, electronics, and early programming.',
      tags: [
        { label: 'Biomedical Engineering', type: 'field' },
        { label: 'Electronics', type: 'tech' },
        { label: 'Engineering Fundamentals', type: 'field' },
      ],
      highlights: [
        'Joined AT WORK robotics team in first year',
        'First contact with programming C++, MATLAB',
        'Engineering and analytical thinking foundation',
      ],
      side: 'right',
    },
    {
      id: 'atwork-team',
      period: '2018 – 2022',
      shortTitle: 'AT WORK Autonomous Robotics',
      category: 'Robotics',
      categoryColor: '#6D5EF7',
      headline: 'AT WORK Autonomous Industrial Robotics',
      description:
        'Joined as an electronics team member and gradually got pulled into programming and AI as the project needed it. The team built an autonomous robot that could perceive its environment, plan a path, manipulate objects, and make decisions in real time.',
      tags: [
        { label: 'ROS', type: 'tech' },
        { label: 'Python', type: 'tech' },
        { label: 'C++', type: 'tech' },
        { label: 'Computer Vision', type: 'field' },
        { label: 'Sensor Fusion', type: 'tech' },
        { label: 'Path Planning', type: 'tech' },
        { label: '1st Place IranOpen 2022 & 2018', type: 'achievement' },
        { label: '3rd Place RoboCup Asia-Pacific 2021', type: 'achievement' },
      ],
      highlights: [
        '1st Place, IranOpen Tehran (2022) & Kish Island (2018)',
        '3rd Place, RoboCup@Work Asia-Pacific Aichi, Japan (2021)',
        'Technical Challenge (Cluttered Pick Test) Sydney, Australia (2019)',
        'Developed perception, navigation, and manipulation subsystems',
      ],
      images: ['/atwork-team.webp', '/atwork-robot.webp'],
      system: [
        { label: 'Perception', items: ['Object Detection', 'Object Recognition', 'Landmark Detection'] },
        { label: 'Localisation', items: ['Odometry', 'Vision-Based', 'Laser-Based', 'IMU + Sensor Fusion'] },
        { label: 'World Model', items: ['Data Structure Design', 'Data Monitoring', 'Watchdog Systems'] },
        { label: 'Navigation', items: ['Path Planning', 'Obstacle Avoidance'] },
        { label: 'Manipulation', items: ['Arm Positioning', 'Pick and Place'] },
        { label: 'Behaviour', items: ['Manual Strategy', 'Autonomous Strategy', 'AI Decision Making'] },
        { label: 'Communication', items: ['ROS Low-Level', 'Wireless & LAN', 'Referee Control'] },
      ],
      side: 'left',
    },
    {
      id: 'pro-transition',
      period: '2022',
      shortTitle: 'Graduation & Entry into Software',
      category: 'Software Engineering',
      categoryColor: '#F472B6',
      headline: 'Graduation & Entry into Professional Software Engineering',
      description:
        'Joined SRC Software Company, starting in Angular and JavaScript. First delivered product: a coworking space seat-reservation system (Ozone) including the admin side, managing users, seat inventory, team-based pricing, and discount codes underneath a simple booking screen.',
      tags: [
        { label: 'Angular', type: 'tech' },
        { label: 'JavaScript', type: 'tech' },
        { label: 'Frontend Development', type: 'field' },
      ],
      highlights: [
        'First professional project: Ozone coworking seat-reservation system',
        'Admin layer: users, seat inventory, team pricing, discount codes',
        'Seat map visualisation with real-time availability via SVG',
      ],
      side: 'right',
    },
    {
      id: 'flutter-transition',
      period: '2022 – Present',
      shortTitle: 'Mobile Development & Project Delivery',
      category: 'Mobile Development',
      categoryColor: '#34D399',
      headline: 'Flutter Mobile Development & Project Delivery',
      description:
        'Moved into Flutter and Dart once the team needed a mobile developer. Since then: a healthcare platform connecting patients, doctors, and families (AKSSI); a language-learning platform with teacher and student sides (Polylo); a points-and-rewards app (Pinup); a polling platform with tiered identity verification (Pollett). Consistent architecture throughout: BLoC and Provider for state, MVVM with a Repository pattern underneath.',
      tags: [
        { label: 'Flutter', type: 'tech' },
        { label: 'Dart', type: 'tech' },
        { label: 'REST APIs', type: 'tech' },
        { label: 'Firebase', type: 'tech' },
        { label: 'BLoC', type: 'tech' },
        { label: 'MVVM', type: 'field' },
      ],
      highlights: [
        'AKSSI healthcare platform (patient, doctor, family roles)',
        'Polylo language learning with teacher & student panels',
        'Pinup points-and-rewards app with restaurant partners',
        'Pollett social polling with tiered face-verification',
      ],
      system: [
        { label: 'Healthcare (AKSSI)', items: ['Patient–Doctor Chat', 'Video Calls (native bridge)', 'Vitals via Bina Camera', 'Custom Health Graph', 'Interactive Body Map (HTML/JS embed)'] },
        { label: 'Education (Polylo)', items: ['Teacher & Student Panels', 'All 4 Language Skills', 'Scenario-Based Games', 'Adaptive Flashcards', 'Live Chat & Analytics'] },
        { label: 'Rewards (Pinup)', items: ['Mini-Games', 'Points System', 'Coupon Exchange', 'Restaurant Partners'] },
        { label: 'Social (Pollett)', items: ['Community Polls', 'Tiered Verification', 'Face Auth (TFLite)', 'AI Assistant (Polly)'] },
      ],
      side: 'left',
    },
    {
      id: 'ml-ai',
      period: '2023 – Present',
      shortTitle: 'AI / Machine Learning',
      category: 'AI / ML',
      categoryColor: '#F59E0B',
      headline: 'Independent AI Study & Applied ML on Pollett',
      description:
        'Alongside the day job, worked through an independent course building LLMs from scratch in PyTorch tensors up through a small GPT-style Transformer. Separately, took on an AI-focused role on Pollett: an on-device face-verification feature built with TensorFlow Lite, and an in-app assistant. Most of the earlier work predates this; the AI came later, on purpose.',
      tags: [
        { label: 'PyTorch', type: 'tech' },
        { label: 'TensorFlow Lite', type: 'tech' },
        { label: 'Python', type: 'tech' },
        { label: 'LLMs', type: 'field' },
        { label: 'Prompt Engineering', type: 'field' },
      ],
      highlights: [
        'Independent LLM course tensors to GPT-style Transformer in PyTorch',
        '"Pollett Liveness" on-device face auth with TensorFlow Lite',
        '"Polly" in-app AI assistant for Pollett',
      ],
      side: 'right',
    },
    {
      id: 'future',
      period: 'Academic Goal →',
      shortTitle: 'Master\'s Application FEUP Porto',
      category: 'Academic Goal',
      categoryColor: '#6D5EF7',
      headline: 'Applying for a Master\'s in Software Engineering',
      description:
        'Applying for a Master\'s at FEUP, University of Porto to strengthen programming knowledge and return to an academic environment, something I\'ve wanted for a while after progressing professionally without it.',
      tags: [
        { label: 'Artificial Intelligence', type: 'field' },
        { label: 'Software Engineering', type: 'field' },
        { label: 'Intelligent Systems', type: 'field' },
        { label: 'FEUP University of Porto', type: 'achievement' },
      ],
      highlights: [
        'Interdisciplinary background: engineering, robotics, software, AI',
        'Real-world experience in autonomous systems and shipped products',
        'Goal: deepen theoretical foundations alongside professional practice',
      ],
      side: 'left',
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => this.checkVisibility(), 150);
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  checkVisibility(): void {
    const vh = window.innerHeight;
    this.entryRefs?.forEach((ref, i) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (rect.top < vh * 0.88) {
        this.visibleEntries.update(prev => {
          if (prev.has(i)) return prev;
          return new Set([...prev, i]);
        });
      }
    });
  }

  isVisible(i: number): boolean {
    return this.visibleEntries().has(i);
  }

  toggleExpand(id: string): void {
    this.expandedIds.update(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  openLightbox(img: string): void {
    this.lightboxImage.set(img);
  }

  closeLightbox(): void {
    this.lightboxImage.set(null);
  }
}
