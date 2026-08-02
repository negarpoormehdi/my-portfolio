import { Injectable } from '@angular/core';

export interface Metric {
  value: string;
  label: string;
  accent?: boolean;
}

export interface TechCard {
  label: string;
  items: string[];
}

export interface PipelineStep {
  index: number;
  title: string;
}

export interface Feature {
  icon: 'edit' | 'chart' | 'star';
  title: string;
  description: string;
}

export interface Asset {
  type: 'video' | 'diagram' | 'photo' | 'mobile-mockup' | 'desktop-mockup' | 'scrollable-desktop';
  icon: string;
  title: string;
  description: string;
  src?: string;
}

export interface ProjectLink {
  type: 'appstore' | 'googleplay' | 'website';
  url: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  shortTitle: string;
  title: string;
  role: string;
  tagline: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  tags: string[];
  overview: string;
  metrics?: Metric[];
  technicalFramework: TechCard[];
  pipeline?: PipelineStep[];
  features?: Feature[];
  assets: Asset[];
  links?: ProjectLink[];
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  readonly projects: CaseStudy[] = [

    /* ────────────────────────────────────────────────
       01 · AKSSI
    ──────────────────────────────────────────────── */
    {
      slug: 'akssi',
      shortTitle: 'AKSSI Healthcare',
      title: 'AKSSI',
      role: 'Cross-Platform Mobile Engineer · Flutter',
      tagline: 'Multi-role healthcare app connecting patients, doctors, and family members built in Flutter with native code where the packages couldn\'t keep up.',
      gradientFrom: '#6D5EF7',
      gradientTo: '#8B7EF8',
      icon: 'health_and_safety',
      tags: ['Flutter', 'Dart', 'Firebase', 'Java', 'Swift', 'HTML/JS', 'WebRTC'],
      overview: `AKSSI connects three roles patients, doctors, and family members each with their own version of the app. Patients track vitals, view health reports, and message or video-call their care team. Doctors manage patient records and consult remotely. Family members get status updates without stepping into medical detail they're not meant to see. Built mostly in Flutter, with native code stepping in wherever Flutter's ecosystem couldn't keep up.`,
      metrics: [
        { value: '3 Roles', label: 'Patient · Doctor · Relative', accent: true },
        { value: 'App Store', label: '& Google Play', accent: true },
      ],
      technicalFramework: [
        {
          label: 'Patient & Doctor App',
          items: [
            'Flutter & Dart single codebase for iOS and Android',
            'REST APIs for data, Firebase for notifications and offline caching',
            'Interactive Body Map SVG pain-location marker built in HTML/JS, embedded in Flutter',
          ],
        },
        {
          label: 'Video Calls & Chat',
          items: [
            'Native Android (Java) & iOS (Swift) implementations for video calls available Flutter packages weren\'t reliable enough',
            'Bridged back into the Flutter app via platform channels',
            'Chat on Firebase with native notification handling on both platforms',
          ],
        },
        {
          label: 'Vitals & Health Graphs',
          items: [
            'Bina camera integration measures vital signs through the device camera official package was unstable, runs on custom native code',
            'Health-data graph built from scratch no Flutter charting library handled the time-range and visualisation requirements',
          ],
        },
      ],
      assets: [
        {
          type: 'mobile-mockup',
          icon: 'play',
          title: 'Interactive Body Map',
          description: 'SVG body map built in HTML/JS and embedded in Flutter patients tap the front or back of the body to mark exactly where they feel pain before submitting a report.',
          src: 'akssi-vid1.MP4',
        },
        {
          type: 'mobile-mockup',
          icon: 'play',
          title: 'Doctor Ticket Dashboard',
          description: 'Doctor-side ticket management dashboard incoming patient reports, triage status, and assigned cases in one view.',
          src: 'akssi-vid2.mp4',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Patient Dashboard',
          description: 'Patient home screen health summary, active reports, and quick access to the care team.',
          src: 'akksi-pic1.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Bina Vitals Screen',
          description: 'The Bina camera integration screen patients hold their phone camera to measure vitals. Built on custom native code after the official package proved unstable.',
          src: 'akssi-pic2.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Health Data Graph',
          description: 'Custom-built health graph showing vital sign history over time no Flutter charting library handled the time-range and visualisation requirements, so it was written from scratch.',
          src: 'akssi-pic3.webp',
        },
      ],
      links: [
        { type: 'appstore',   url: 'https://apps.apple.com/us/app/akssi/id6744976534', label: 'App Store' },
        { type: 'googleplay', url: 'https://play.google.com/store/apps/details?id=com.budstechnology.akssing&hl=en', label: 'Google Play' },
      ],
    },

    /* ────────────────────────────────────────────────
       03 · Quest Learning (Polylo)
    ──────────────────────────────────────────────── */
    {
      slug: 'quest-learning',
      shortTitle: 'Polylo',
      title: 'Polylo',
      role: 'Full-Stack Developer · Flutter & Angular',
      tagline: 'Teachers design lessons and games; students play through them, practice vocabulary, and chat live each side with its own purpose.',
      gradientFrom: '#7C3AED',
      gradientTo: '#9B5FF5',
      icon: 'school',
      tags: ['Flutter', 'Angular', 'Dart', 'TypeScript', 'REST API'],
      overview: `Polylo (built as Quest) is where teachers and students each get their own side of the same platform. Teachers design lessons, quizzes, and scenario-based games; students play through them, practice vocabulary, and chat live with their teacher. Probably the most serious web project here, and where the JavaScript game layer was the first real attempt at gamification.`,
      metrics: [
        { value: 'Flutter', label: 'mobile + Angular web', accent: true },
        { value: '9 months', label: 'development', accent: false },
      ],
      technicalFramework: [
        {
          label: 'Assessment Engine',
          items: [
            'Dedicated question types for all four language skills: writing (graded manually, with inline comments), speaking (recorded and submitted), listening (audio playback), reading (highlighted text)',
            'Lessons and quizzes assign to specific students or groups',
          ],
        },
        {
          label: 'Gamification',
          items: [
            'Teachers build scenario-based games: designing characters, movement paths, and embedding assessment questions directly into gameplay',
            'JavaScript game layer built from scratch for the web panel',
          ],
        },
        {
          label: 'Adaptive Flashcards & Analytics',
          items: [
            'Spaced-repetition system on the student side adjusts formatting, frequency, and notification timing based on individual performance',
            'Live chat with timed in-chat questions',
            'Analytics dashboard including a bubble chart where bubble size tracks word usage frequency per student',
          ],
        },
      ],
      features: [
        {
          icon: 'edit',
          title: 'Multi-Skill Assessment',
          description: 'Question types covering all four language skills writing with inline grading, speaking submissions, listening, and reading all assignable to specific students or groups.',
        },
        {
          icon: 'chart',
          title: 'Analytics Dashboard',
          description: 'Real-time performance data per student including a bubble chart tracking vocabulary usage frequency over time.',
        },
        {
          icon: 'star',
          title: 'Scenario-Based Games',
          description: 'Teachers design interactive games with custom characters and movement paths assessment questions embedded directly into the gameplay flow.',
        },
      ],
      assets: [
        {
          type: 'mobile-mockup',
          icon: 'play',
          title: 'Sentence Builder Student Mobile',
          description: 'Student mobile app an exercise where the student arranges given words into a correct sentence, testing grammar and vocabulary in context.',
          src: 'ploly-mobile2.MP4',
        },
        {
          type: 'mobile-mockup',
          icon: 'play',
          title: 'Spelling Exercise Student Mobile',
          description: 'Student mobile app spelling exercise for a vocabulary word the student has already learned.',
          src: 'poolylo-mobile1.MP4',
        },
        {
          type: 'desktop-mockup',
          icon: 'desktop',
          title: 'Admin Management Panel',
          description: 'The admin panel managing users, classes, and platform-wide content from a single dashboard.',
          src: 'polylo-pic2.webp',
        },
        {
          type: 'desktop-mockup',
          icon: 'desktop',
          title: 'Writing & Teacher Correction',
          description: 'Teacher panel a student\'s writing submission alongside the teacher\'s inline corrections and grading.',
          src: 'polylo-pic1.webp',
        },
        {
          type: 'desktop-mockup',
          icon: 'play',
          title: 'Scenario Game Student Web',
          description: 'The scenario-based game on the student web panel teachers design the characters and movement paths; assessment questions are embedded directly into the gameplay.',
          src: 'plylo-game.MP4',
        },


      ],
    },

    /* ────────────────────────────────────────────────
       04 · PinUp
    ──────────────────────────────────────────────── */
    {
      slug: 'pinup',
      shortTitle: 'Pinup',
      title: 'Pinup',
      role: 'Mobile Developer · Flutter',
      tagline: 'Play games, earn points, exchange them for coupons from restaurant and fast-food partners.',
      gradientFrom: '#F472B6',
      gradientTo: '#EC4899',
      icon: 'gamepad',
      tags: ['Flutter', 'Dart', 'REST API', 'Animations', 'Gamification'],
      overview: `A straightforward points-and-rewards loop: play games, earn points, exchange them for coupons from restaurant and fast-food partners.`,
      metrics: [
        { value: 'Games', label: 'Earn points through mini-games', accent: true },
        { value: 'Coupons', label: 'Redeemable at partner restaurants', accent: false },
      ],
      technicalFramework: [
        {
          label: 'Mobile Development',
          items: [
            'Flutter & Dart cross-platform app for iOS and Android',
            'Custom animations game transitions and reward reveals',
            'REST APIs handling the points ledger and coupon redemption against partner businesses',
          ],
        },
        {
          label: 'Points & Rewards',
          items: [
            'Points management logic earn, burn, and expiry rules',
            'Secure voucher code generation single-use redemption tokens',
            'Partner venue integration real-time coupon availability',
          ],
        },
      ],
      assets: [
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Activity Dashboard',
          description: 'Management panel showing recent games played alongside the points earned from each session.',
          src: 'pinup-pic1.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Games Catalogue',
          description: 'Full list of available mini-games browse and pick what to play next.',
          src: 'pinup-pic2.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Points Redemption',
          description: 'Exchange accumulated points for food choose what you want to redeem and confirm the coupon.',
          src: 'pinup-pic3.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Points Summary',
          description: 'Total points overview how much you\'ve earned in total and the breakdown by which games they came from.',
          src: 'pinup-pic4.webp',
        },
      ],
    },

    /* ────────────────────────────────────────────────
       05 · Ozone (Coworking)
    ──────────────────────────────────────────────── */
    {
      slug: 'coworking',
      shortTitle: 'Ozone',
      title: 'Ozone',
      role: 'Web Developer · Angular',
      tagline: 'View the office map, check availability, and reserve a seat no admin needed. A full admin layer underneath handles the rest.',
      gradientFrom: '#3B82F6',
      gradientTo: '#60A5FA',
      icon: 'meeting_room',
      tags: ['Angular', 'TypeScript', 'JavaScript', 'SVG'],
      overview: `A web app for booking coworking seats view the office map, check availability, reserve a seat for a date, no admin needed. Underneath the simple booking screen, there's a full admin side too. First professional project, delivered at SRC.`,
      metrics: [
        { value: 'Real-Time', label: 'Seat availability on the map', accent: true },
        { value: 'Zero Admin', label: 'Self-service reservation workflow', accent: true },
      ],
      technicalFramework: [
        {
          label: 'Booking Interface',
          items: [
            'Angular & TypeScript component-driven SPA architecture',
            'SVG rendering interactive floorplan with colour-coded seat states (available, reserved, blocked)',
            'Real-time seat state updates without page reload',
          ],
        },
        {
          label: 'Admin Layer',
          items: [
            'User management and seat inventory configuration',
            'Team-based pricing rules and discount code creation',
            'Less visible than the booking flow the more complex half of the project',
          ],
        },
      ],
      assets: [
        {
          type: 'desktop-mockup',
          icon: 'desktop',
          title: 'Admin Panel',
          description: 'Admin dashboard managing users, seat inventory, team-based pricing tiers, and discount code configuration. The less visible but more complex half of the project.',
          src: 'ozone-admin.webp',
        },
        {
          type: 'scrollable-desktop',
          icon: 'desktop',
          title: 'Booking Interface',
          description: 'The user-facing booking screen interactive SVG floorplan with colour-coded seat availability. Scroll to see the full page from the seat map down to the reservation confirmation.',
          src: 'ozone-user.webp',
        },
      ],
      links: [
        { type: 'website', url: 'https://ozonecowork.ir/', label: 'ozonecowork.ir' },
      ],
    },

    /* ────────────────────────────────────────────────
       06 · Pollett
    ──────────────────────────────────────────────── */
    {
      slug: 'pollett',
      shortTitle: 'Pollett',
      title: 'Pollett',
      role: 'Mobile & AI Integration Engineer · Flutter',
      tagline: 'Community polls organised by shared interests, with tiered identity verification and an AI track added later.',
      gradientFrom: '#10B981',
      gradientTo: '#34D399',
      icon: 'how_to_vote',
      tags: ['Flutter', 'Dart', 'REST API', 'TensorFlow Lite', 'PyTorch'],
      overview: `Pollett lets users create and vote on polls, organized by shared interests, with privacy controls and a tiered verification system. Later extended with an AI-focused track: an on-device face-verification feature and an in-app assistant. Available on Google Play.`,
      metrics: [
        { value: 'Google Play', label: 'Published', accent: true },
        { value: 'AI Role', label: 'Feb 2025 – Present', accent: false },
      ],
      technicalFramework: [
        {
          label: 'Core App',
          items: [
            'Flutter & Dart cross-platform mobile app',
            'Tiered account system: standard access, or verified "Alpha" status using face recognition prevents double-voting',
            'Public/private visibility, signed or secret voting, anonymous creator option',
            'Real-time vote counts verified identities enforce one-vote-per-user on secured polls',
          ],
        },
        {
          label: 'AI Extension',
          items: [
            '"Pollett Liveness" face-authentication feature built with TensorFlow Lite for on-device inference',
            '"Polly" in-app AI assistant',
            'This came through a separate AI-focused role alongside learning LLM integration and prompt engineering',
          ],
        },
      ],
      assets: [
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Home Screen',
          description: 'The opening screen of Pollett entry point into the app showing the main feed and community structure.',
          src: 'pollet-pic2.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Poll with Engagement',
          description: 'A single poll in the feed showing vote options alongside like and comment interactions.',
          src: 'pollet-pic1.webp',
        },
        {
          type: 'mobile-mockup',
          icon: 'chart',
          title: 'Poll Results',
          description: 'Real-time vote breakdown with respondent count and community engagement metrics.',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Alpha Verification',
          description: 'The face-scan verification flow for earning Alpha status.',
        },
      ],
      links: [
        { type: 'googleplay', url: 'https://play.google.com/store/apps/details?id=xyz.pollett.pollett&hl=en', label: 'Google Play' },
      ],
    },


  ];

  getBySlug(slug: string): CaseStudy | undefined {
    return this.projects.find(p => p.slug === slug);
  }

  getOthers(slug: string, limit = 3): CaseStudy[] {
    return this.projects.filter(p => p.slug !== slug).slice(0, limit);
  }
}
