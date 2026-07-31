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
      shortTitle: 'Entering Biomedical Engineering',
      category: 'Education',
      categoryColor: '#7C3AED',
      headline: 'B.Sc. Biomedical Engineering — Islamic Azad University of Qazvin',
      description:
        'Driven by a desire to solve meaningful problems at the intersection of engineering and healthcare. Chose Qazvin for its serious academic environment, active research culture, and competitive robotics programs. This decision laid the engineering and analytical foundation for everything that followed.',
      tags: [
        { label: 'Biomedical Engineering', type: 'field' },
        { label: 'Electronics', type: 'tech' },
        { label: 'Engineering Fundamentals', type: 'field' },
        { label: 'Problem Solving', type: 'field' },
        { label: 'Programming Foundations', type: 'tech' },
      ],
      highlights: [
        'Joined AT WORK robotics team in first year',
        'Developed engineering and analytical thinking',
        'First contact with programming (C++, MATLAB)',
      ],
      side: 'right',
    },
    {
      id: 'atwork-team',
      period: '2018 – 2022',
      shortTitle: 'AT WORK Robotics Team',
      category: 'Robotics',
      categoryColor: '#6D5EF7',
      headline: 'AT WORK — Autonomous Industrial Robotics',
      description:
        'Joined as an electronics team member and gradually transitioned into software and AI. The team built autonomous robotic systems capable of perceiving environments, planning paths, manipulating objects, and making real-time decisions. This environment became a complete introduction to intelligent systems.',
      tags: [
        { label: 'ROS', type: 'tech' },
        { label: 'Python', type: 'tech' },
        { label: 'Computer Vision', type: 'field' },
        { label: 'Autonomous Systems', type: 'field' },
        { label: 'Sensor Fusion', type: 'tech' },
        { label: 'Path Planning', type: 'tech' },
        { label: '3rd Place Global 2021', type: 'achievement' },
        { label: '1st Place Iran', type: 'achievement' },
      ],
      highlights: [
        '3rd place globally (2021) and 1st place nationally in Iran',
        'Developed object detection, localization, and navigation subsystems',
        'First exposure to AI-based decision making in real systems',
        'Learned Python through collaboration and team guidance',
      ],
      images: ['/atwork-team.webp', '/atwork-robot.webp'],
      system: [
        { label: 'Perception', items: ['Object Detection', 'Object Recognition', 'Landmark Detection'] },
        { label: 'Localization', items: ['Odometry', 'Vision-Based', 'Laser-Based', 'IMU + Sensor Fusion'] },
        { label: 'World Model', items: ['Data Structure Design', 'Data Monitoring', 'Watchdog Systems'] },
        { label: 'Navigation', items: ['Path Planning', 'Obstacle Avoidance'] },
        { label: 'Manipulation', items: ['Arm Positioning', 'Pick and Place'] },
        { label: 'Behavior', items: ['Manual Strategy', 'Autonomous Strategy', 'AI Decision Making'] },
        { label: 'Communication', items: ['ROS Low-Level', 'Wireless & LAN', 'Referee Control'] },
      ],
      side: 'left',
    },
    {
      id: 'academic-prog',
      period: '2018 – 2022',
      shortTitle: 'Programming & Academic Foundation',
      category: 'Education',
      categoryColor: '#7C3AED',
      headline: 'Academic Studies & Technical Foundation',
      description:
        'Parallel to robotics, coursework in Biomedical Engineering introduced formal programming, electronics, and systems thinking. The combination of academic theory and hands-on robotics created a strong interdisciplinary base that would later accelerate the transition into professional software engineering.',
      tags: [
        { label: 'C++', type: 'tech' },
        { label: 'MATLAB', type: 'tech' },
        { label: 'Python', type: 'tech' },
        { label: 'Microprocessor Programming', type: 'tech' },
        { label: 'Electronics', type: 'tech' },
        { label: 'Biomedical Systems', type: 'field' },
      ],
      highlights: [
        'Formal programming education in C++ and MATLAB',
        'Microprocessor and embedded systems coursework',
        'Engineering mathematics and signal processing',
        'Biomedical data analysis with MATLAB',
      ],
      side: 'right',
    },
    {
      id: 'pro-transition',
      period: '2022',
      shortTitle: 'Transition to Professional Software Development',
      category: 'Software Engineering',
      categoryColor: '#F472B6',
      headline: 'Graduation & Entry into Professional Software Engineering',
      description:
        'After graduating in 2022, took a deliberate step into professional software development. Joined the SRC team, beginning with frontend development in Angular and JavaScript before transitioning into Flutter mobile development as team needs evolved. A coworking space seat reservation system was the first delivered product.',
      tags: [
        { label: 'Angular', type: 'tech' },
        { label: 'JavaScript', type: 'tech' },
        { label: 'Frontend Development', type: 'field' },
        { label: 'UI/UX', type: 'field' },
      ],
      highlights: [
        'First professional software project: coworking seat reservation system',
        'Seat map visualization with real-time availability',
        'Eliminated manual admin communication for reservations',
      ],
      images: ['/src-team.webp'],
      side: 'left',
    },
    {
      id: 'flutter-transition',
      period: '2022 – 2023',
      shortTitle: 'Flutter & Cross-Platform Mobile Development',
      category: 'Mobile Development',
      categoryColor: '#34D399',
      headline: 'Flutter Mobile Development & Project Delivery',
      description:
        'Transitioned into Flutter and Dart for cross-platform mobile application development. Delivered multiple production applications across healthcare, education, and consumer markets. Each project deepened expertise in application architecture, REST API integration, authentication flows, and multi-platform deployment.',
      tags: [
        { label: 'Flutter', type: 'tech' },
        { label: 'Dart', type: 'tech' },
        { label: 'REST APIs', type: 'tech' },
        { label: 'Authentication', type: 'tech' },
        { label: 'Cross-Platform', type: 'field' },
        { label: 'App Architecture', type: 'field' },
      ],
      highlights: [
        'Healthcare communication platform (patients, doctors, family)',
        'English language learning platform with teacher & student panels',
        'Gamified food rewards application with points and coupon system',
        'Angular web development alongside Flutter mobile',
      ],
      system: [
        { label: 'Healthcare Platform', items: ['Patient–Doctor Chat', 'Video Calls', 'Health Data Analysis', 'AI-Supported Insights', 'Multi-Role Interfaces'] },
        { label: 'Education Platform', items: ['Teacher & Student Panels', 'Assessment Tools', 'Multiple Question Types', 'Gamification', 'Angular Web + Flutter Mobile'] },
        { label: 'Rewards Platform', items: ['Game Integration', 'Points System', 'Coupon Exchange', 'Restaurant Partnerships'] },
      ],
      side: 'right',
    },
    {
      id: 'ml-ai',
      period: '2023 – Present',
      shortTitle: 'Machine Learning & Artificial Intelligence',
      category: 'AI / ML',
      categoryColor: '#F59E0B',
      headline: 'Independent Exploration of Machine Learning & AI',
      description:
        'Alongside professional software development, began an independent exploration of machine learning — driven by the desire to understand the intelligent systems encountered in robotics and to deepen the connection between software engineering and AI. This brought together all previous threads: engineering intuition, programming skill, and systems thinking.',
      tags: [
        { label: 'Machine Learning', type: 'field' },
        { label: 'Python', type: 'tech' },
        { label: 'Data Preparation', type: 'tech' },
        { label: 'Model Training', type: 'tech' },
        { label: 'Model Evaluation', type: 'tech' },
        { label: 'AI Systems', type: 'field' },
      ],
      highlights: [
        'Data preparation and feature engineering for ML pipelines',
        'Supervised and unsupervised learning algorithms',
        'Model evaluation and performance analysis',
        'Recognition of convergence between robotics, software, and AI',
      ],
      side: 'left',
    },
    {
      id: 'future',
      period: 'Future Plan →',
      shortTitle: 'Graduate Studies — Intelligent Systems',
      category: 'Academic Goal',
      categoryColor: '#6D5EF7',
      headline: 'Pursuing a Master\'s Degree in AI, Software Engineering, or Intelligent Systems',
      description:
        'The full arc of this journey — from solving biomedical engineering problems, through competitive robotics, professional software development, and independent AI research — converges toward a single goal: deepening the theoretical and practical foundation for designing and building intelligent systems that matter.',
      tags: [
        { label: 'Artificial Intelligence', type: 'field' },
        { label: 'Machine Learning', type: 'field' },
        { label: 'Robotics', type: 'field' },
        { label: 'Software Engineering', type: 'field' },
        { label: 'Intelligent Systems', type: 'field' },
        { label: "Master's Application", type: 'achievement' },
      ],
      highlights: [
        'Interdisciplinary background across engineering, robotics, and software',
        'Real-world experience in autonomous systems and AI decision making',
        'Professional software engineering across mobile, web, and data domains',
        '"From solving engineering problems to building intelligent software systems."',
      ],
      side: 'right',
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
