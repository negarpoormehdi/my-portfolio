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
  type: 'video' | 'diagram' | 'photo' | 'mobile-mockup' | 'desktop-mockup';
  icon: string;
  title: string;
  description: string;
  src?: string;   // actual file path from /public — if set, renders real media
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
  quote: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  readonly projects: CaseStudy[] = [

    /* ────────────────────────────────────────────────
       01 · AT WORK Robotics
    ──────────────────────────────────────────────── */
    {
      slug: 'robotics',
      shortTitle: 'AT WORK Robotics',
      title: 'AT WORK — Robotics & Autonomous Systems',
      role: 'Electronics & Software System Developer',
      tagline: 'Integrated Perception, Navigation, and AI-Driven Decision-Making for Autonomous Industrial Robotics.',
      gradientFrom: '#F59E0B',
      gradientTo: '#FBBF24',
      icon: 'robot',
      tags: ['Python', 'C++', 'ROS', 'MATLAB', 'OpenCV', 'YOLOv8', 'Computer Vision', 'AI'],
      overview: `As part of a global RoboCup AT WORK team, I contributed to engineering a fully autonomous industrial robot capable of perceiving its environment, navigating safely, manipulating objects, and making real-time decisions without human input. The system integrated multiple sensory pipelines — LiDAR, camera, IMU — processed through a unified ROS architecture into a coherent world model that drove path planning and arm manipulation behaviours. The project earned 1st Place Nationally and 3rd Place Globally in competitive evaluation.`,
      metrics: [
        { value: '🥇 1st', label: 'Place — National RoboCup AT WORK', accent: true },
        { value: '🥉 3rd', label: 'Place — Global RoboCup AT WORK', accent: true },
        { value: '6-Stage', label: 'Fully Integrated Autonomy Pipeline' },
      ],
      technicalFramework: [
        {
          label: 'Perception & Vision',
          items: [
            'ROS (Robot Operating System) node architecture',
            'OpenCV — image processing & feature extraction',
            'YOLOv8 — real-time object detection & landmark identification',
            'Depth camera integration for 3D environment mapping',
          ],
        },
        {
          label: 'Navigation & Localisation',
          items: [
            'Odometry-based pose estimation',
            'Sensor fusion: IMU + LiDAR (Extended Kalman Filter)',
            'SLAM — simultaneous localisation and mapping',
            'Dijkstra & RRT path planning algorithms',
          ],
        },
        {
          label: 'System Architecture & Control',
          items: [
            'World Model Management — unified environment state',
            'Hierarchical Decision Trees for task sequencing',
            'Robotic arm inverse kinematics for manipulation',
            'MATLAB simulation for pre-deployment validation',
          ],
        },
      ],
      pipeline: [
        { index: 1, title: 'Sensors & Vision' },
        { index: 2, title: 'Perception' },
        { index: 3, title: 'Localisation & Sensor Fusion' },
        { index: 4, title: 'World Model' },
        { index: 5, title: 'Path Planning & Decision Making' },
        { index: 6, title: 'Autonomous Behaviour & Manipulation' },
      ],
      assets: [
        {
          type: 'video',
          icon: 'play',
          title: 'Video Showcase',
          description: '16:9 HD embedded video / GIF: Robot performing autonomous pick-and-place tasks and navigating an obstacle course in competition conditions.',
        },
        {
          type: 'diagram',
          icon: 'sitemap',
          title: 'ROS Architecture Diagram',
          description: 'Full ROS system architecture diagram showing ROS nodes, sensor inputs (LiDAR / Camera), topic communication, and motor output controllers.',
        },
        {
          type: 'photo',
          icon: 'trophy',
          title: 'Competition Photo & GUI Dashboard',
          description: 'High-resolution action photo of the robot in competition alongside the GUI monitoring dashboard displaying real-time sensor telemetry and world model state.',
        },
      ],
      quote: 'Understanding how perception, data, planning, and action work together in robotics formed my foundation for complex intelligent software systems.',
    },

    /* ────────────────────────────────────────────────
       02 · AKSSI
    ──────────────────────────────────────────────── */
    {
      slug: 'akssi',
      shortTitle: 'AKSSI Healthcare',
      title: 'AKSSI — Telehealth & Care Communication Platform',
      role: 'Cross-Platform Mobile Engineer · Flutter',
      tagline: 'Multi-role healthcare ecosystem connecting patients, doctors, and family members with real-time AI analytics.',
      gradientFrom: '#6D5EF7',
      gradientTo: '#8B7EF8',
      icon: 'health',
      tags: ['Flutter', 'Dart', 'Firebase', 'Java', 'Swift', 'WebRTC', 'Python', 'AI'],
      overview: `AKSSI is a cross-platform healthcare application designed around three distinct user roles — Patient, Doctor, and Relative — each with tailored workflows. Patients monitor vitals (heart rate, blood pressure, oxygen saturation), access AI-generated health trend summaries, and connect with their care team through encrypted video calls. Doctors manage patient case files, review historical analytics, and conduct remote consultations. Relatives receive curated health status updates without compromising medical privacy. The platform was piloted in a clinical environment and maintained 99.9% uptime throughout testing.`,
      metrics: [
        { value: '99.9%', label: 'Uptime during pilot clinical testing', accent: true },
        { value: '3 Roles', label: 'Patient · Doctor · Relative', accent: true },
        { value: 'E2E', label: 'Encrypted communication channels' },
      ],
      technicalFramework: [
        {
          label: 'Patient & Doctor Mobile App',
          items: [
            'Flutter & Dart — single codebase for iOS and Android',
            'RESTful APIs — health data CRUD and user management',
            'WebSockets — real-time vital sign data streaming',
            'Firebase — push notifications and offline caching',
          ],
        },
        {
          label: 'AI Vitals Modelling',
          items: [
            'Python-based predictive analytics service',
            'Time-series analysis for patient stability trends',
            'Anomaly detection — alerts for critical vital deviations',
            'Health trend summaries delivered to doctor dashboard',
          ],
        },
        {
          label: 'Telehealth & Media',
          items: [
            'WebRTC / Agora SDK — low-latency encrypted video calls',
            'Real-time bidirectional chat with message persistence',
            'Media sharing — secure attachment handling in consultations',
            'Java (Android) & Swift (iOS) native bridges for device sensors',
          ],
        },
      ],
      assets: [
        {
          type: 'mobile-mockup',
          icon: 'play',
          title: 'Patient Dashboard Walkthrough',
          description: 'Full video walkthrough of the Patient Dashboard — vital sign tracking, AI health summaries, and navigation across the multi-role interface.',
          src: 'akssi-vid1.MP4',
        },
        {
          type: 'mobile-mockup',
          icon: 'play',
          title: 'WebRTC Video Call Demo',
          description: 'Embedded video walkthrough showing a seamless WebRTC video consultation between the Doctor and Patient app interfaces with live vital overlays.',
          src: 'akssi-vid2.mp4',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'App Screenshot — Screen 1',
          description: 'Mobile screenshot from the AKSSI app showing core UI components and the primary user flow.',
          src: 'akksi-pic1.jpg',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'App Screenshot — Screen 2',
          description: 'Mobile screenshot highlighting the vitals monitoring and health data visualisation screen.',
          src: 'akssi-pic2.png',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'App Screenshot — Screen 3',
          description: 'Mobile screenshot of the communication and teleconsultation interface within the AKSSI platform.',
          src: 'akssi-pic3.png',
        },
      ],
      quote: 'This project strengthened my interest in the intersection of software engineering, artificial intelligence, and healthcare technologies.',
    },

    /* ────────────────────────────────────────────────
       03 · Quest Learning
    ──────────────────────────────────────────────── */
    {
      slug: 'quest-learning',
      shortTitle: 'Quest Learning',
      title: 'EdTech Smart Language Learning Ecosystem',
      role: 'Full-Stack & Mobile Developer · Flutter & Angular',
      tagline: 'Gamified multi-role education platform with dynamic assessment engine and teacher management panels.',
      gradientFrom: '#7C3AED',
      gradientTo: '#9B5FF5',
      icon: 'book',
      tags: ['Flutter', 'Angular', 'Dart', 'TypeScript', 'REST API'],
      overview: `An interactive web and mobile platform built for language learning institutions, supporting custom quiz creation, student progress tracking, automated grading, and gamified study modules. Teachers access a full-featured Angular dashboard to author multi-format question sets, monitor cohort performance, and configure learning paths. Students experience the platform through a gamified Flutter app featuring NPC conversations, badge systems, streak trackers, and real-time assessments — making language acquisition measurably more engaging.`,
      metrics: [
        { value: 'Multi-Role', label: 'Teacher · Student · Admin', accent: true },
        { value: '5+ Types', label: 'Question formats supported', accent: false },
        { value: 'Real-Time', label: 'Analytics & automated grading' },
      ],
      technicalFramework: [
        {
          label: 'Cross-Platform Mobile App',
          items: [
            'Flutter / Dart — full student experience on iOS & Android',
            'Gamification engine — badges, streaks, XP and level progression',
            'NPC conversation system — interactive dialogue-based learning',
            'State management — BLoC pattern for predictable UI state',
          ],
        },
        {
          label: 'Teacher & Admin Panel',
          items: [
            'Angular & TypeScript — responsive web dashboard',
            'Multi-type question builder — MCQ, audio match, fill-in-the-blank',
            'Real-time student analytics — performance heatmaps and progress curves',
            'Cohort management — class creation, assignment scheduling',
          ],
        },
        {
          label: 'Backend Integration',
          items: [
            'RESTful APIs — assessment data, media assets, and user state',
            'Stateful assessment controllers — session persistence and resume',
            'Automated grading engine — instant scoring and feedback delivery',
            'Media pipeline — audio/image question asset management',
          ],
        },
      ],
      features: [
        {
          icon: 'edit',
          title: 'Multi-Type Question Builder',
          description: 'Teachers create MCQ, audio-match, fill-in-the-blank, and drag-and-drop exercises through an intuitive drag-and-drop authoring interface.',
        },
        {
          icon: 'chart',
          title: 'Real-Time Analytics',
          description: 'Live dashboards track individual student performance, class averages, question difficulty indices, and learning velocity over time.',
        },
        {
          icon: 'star',
          title: 'Gamified Learning Flow',
          description: 'Badge systems, streak trackers, XP points, leaderboards, and NPC interactions keep students engaged through progressively challenging content.',
        },
      ],
      assets: [
        {
          type: 'desktop-mockup',
          icon: 'desktop',
          title: 'Teacher Dashboard',
          description: 'Full desktop dashboard mockup of the Teacher Panel showing the question builder interface, student analytics graphs, and class performance overview.',
        },
        {
          type: 'video',
          icon: 'play',
          title: 'Student Lesson Demo',
          description: 'Short screen recording showing a student completing an interactive gamified lesson on the mobile app — from NPC dialogue through to badge reward.',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Results & Leaderboard',
          description: 'Mobile screen mockup displaying the student test results summary, XP breakdown, personal best tracker, and class leaderboard ranking.',
        },
      ],
      quote: 'Enhanced my expertise in building multi-role scalable software systems and understanding human-computer interaction in intelligent learning environments.',
    },

    /* ────────────────────────────────────────────────
       04 · PinUp (Gamified Food Rewards)
    ──────────────────────────────────────────────── */
    {
      slug: 'pinup',
      shortTitle: 'PinUp',
      title: 'PinUp — Gamified Food Rewards & Loyalty Platform',
      role: 'Mobile Application Developer · Flutter',
      tagline: 'Engaging reward platform incentivising users through casual mini-games redeemable for restaurant promotions.',
      gradientFrom: '#F472B6',
      gradientTo: '#EC4899',
      icon: 'game',
      tags: ['Flutter', 'Dart', 'REST API', 'Animations', 'Gamification'],
      overview: `PinUp is a Flutter-based consumer application that gamifies user retention for the food and beverage industry. Users engage with interactive mini-games to accumulate loyalty points, which are exchangeable for digital vouchers and coupons redeemable at partner restaurants and fast-food venues. The platform integrates a secure points management system, push-notification campaigns, and a rewards marketplace — turning passive brand loyalty into an active, playful user experience that drives real-world footfall.`,
      metrics: [
        { value: 'Casual', label: 'Mini-games with instant point rewards', accent: true },
        { value: 'Digital', label: 'Voucher & coupon redemption system', accent: true },
        { value: 'Partner', label: 'Restaurant & fast-food venue network' },
      ],
      technicalFramework: [
        {
          label: 'Mobile Development',
          items: [
            'Flutter & Dart — high-performance cross-platform app',
            'Custom animations — game transitions, reward reveals, coin bursts',
            'Lottie integration — cinematic reward animations',
            'Responsive UI — adaptive layouts for varied device sizes',
          ],
        },
        {
          label: 'Architecture & API',
          items: [
            'RESTful APIs — points ledger, voucher catalogue, user profile',
            'Secure voucher code generation — unique single-use redemption tokens',
            'Points management logic — earn, burn, and expiry rules engine',
            'Offline-first caching — local state persistence between sessions',
          ],
        },
        {
          label: 'User Engagement',
          items: [
            'Gamification engine — daily challenges, bonus multipliers, streaks',
            'Push notifications — personalised reward triggers and expiry reminders',
            'Partner venue integration — real-time coupon availability sync',
            'Analytics hooks — engagement funnel tracking for business reporting',
          ],
        },
      ],
      assets: [
        {
          type: 'video',
          icon: 'play',
          title: 'Gameplay & Coupon Demo',
          description: '10-second smooth video loop showing gameplay interaction and the instant conversion of accumulated points into a redeemable restaurant coupon.',
        },
        {
          type: 'mobile-mockup',
          icon: 'store',
          title: 'Rewards Marketplace',
          description: 'App screen showing the Rewards Marketplace interface with available fast-food coupons, partner logos, and real-time point balance display.',
        },
        {
          type: 'mobile-mockup',
          icon: 'wallet',
          title: 'Points Wallet & Profile',
          description: 'Profile and Loyalty Points Wallet view showing earned points history, active vouchers, expiry timers, and redeemed coupon archive.',
        },
      ],
      quote: 'Demonstrated how gamification and strategic software design directly influence user engagement and real-world consumer behaviour.',
    },

    /* ────────────────────────────────────────────────
       05 · Coworking Seat Reservation
    ──────────────────────────────────────────────── */
    {
      slug: 'coworking',
      shortTitle: 'Coworking Reservation',
      title: 'Interactive Coworking Space Seat Reservation System',
      role: 'Frontend Developer · Angular',
      tagline: 'Interactive visual floorplan reservation system streamlining workspace management and seating logistics.',
      gradientFrom: '#3B82F6',
      gradientTo: '#60A5FA',
      icon: 'seat',
      tags: ['Angular', 'TypeScript', 'JavaScript', 'HTML5 Canvas', 'SVG'],
      overview: `An intuitive web application built for a coworking hub, allowing members to inspect a live 2D map of the workspace, check seat availability in real time, and reserve desks directly without any administrative intervention. The interactive floorplan renders workspace geometry via SVG, with colour-coded seat states (available, reserved, unavailable) updating in real time. Users simply click a seat, confirm their booking details, and receive instant confirmation — eliminating manual reservation workflows entirely.`,
      metrics: [
        { value: 'Real-Time', label: 'Seat availability status syncing', accent: true },
        { value: 'Zero Admin', label: 'Self-service reservation workflow', accent: true },
        { value: 'SVG-Based', label: 'Interactive 2D spatial floorplan' },
      ],
      technicalFramework: [
        {
          label: 'Frontend Stack',
          items: [
            'Angular & TypeScript — component-driven SPA architecture',
            'HTML5 Canvas / SVG rendering — interactive floorplan visualisation',
            'JavaScript animations — seat selection transitions and state feedback',
            'Reactive Forms — booking validation and confirmation flow',
          ],
        },
        {
          label: 'UI/UX Design',
          items: [
            'Interactive Spatial Mapping — click-to-select seat interaction model',
            'Colour-coded seat states — available (green), reserved (amber), blocked (grey)',
            'Real-time status syncing — live seat state updates without page reload',
            'Responsive layout — functional across desktop and tablet viewports',
          ],
        },
      ],
      assets: [
        {
          type: 'video',
          icon: 'play',
          title: 'Reservation Flow Demo',
          description: 'Screen recording showing a user selecting a desk on the interactive SVG map, viewing seat details, and confirming a real-time reservation with instant feedback.',
        },
        {
          type: 'desktop-mockup',
          icon: 'desktop',
          title: 'Interactive Floorplan',
          description: 'Full-screen layout of the interactive visual floorplan of the coworking space, showing colour-coded seat availability across multiple workspace zones.',
        },
      ],
      quote: 'An early milestone in my transition to professional frontend development, demonstrating how software directly eliminates operational friction.',
    },

    /* ────────────────────────────────────────────────
       06 · Pollett (kept for completeness)
    ──────────────────────────────────────────────── */
    {
      slug: 'pollett',
      shortTitle: 'Pollett',
      title: 'Pollett — Community Social Polling Platform',
      role: 'Mobile Application Developer · Flutter',
      tagline: 'Community-driven social platform where users create polls, interact, and connect around shared interests.',
      gradientFrom: '#10B981',
      gradientTo: '#34D399',
      icon: 'poll',
      tags: ['Flutter', 'Dart', 'REST API'],
      overview: `Pollett is a social platform centred on community-driven polling. Users create and share polls, react with likes, reply with comments, and discover communities built around shared topics. The feed algorithm surfaces contextually relevant polls, and community moderators can curate and pin content. The result is a lightweight, high-engagement social experience built entirely in Flutter with a stateless REST API backend.`,
      metrics: [
        { value: 'Community', label: 'Interest-based group discovery', accent: true },
        { value: 'Real-Time', label: 'Live vote counts & reactions', accent: false },
      ],
      technicalFramework: [
        {
          label: 'Mobile Application',
          items: [
            'Flutter & Dart — performant cross-platform mobile app',
            'Custom poll UI components — animated vote bars and reaction overlays',
            'Infinite scroll feed — paginated content with lazy loading',
            'State management — Provider pattern for reactive UI updates',
          ],
        },
        {
          label: 'Backend Integration',
          items: [
            'RESTful APIs — polls, votes, comments, community membership',
            'Real-time vote count updates via polling or WebSocket',
            'Content moderation hooks — flagging and reporting workflows',
            'Community feed personalisation — interest-based content filtering',
          ],
        },
      ],
      assets: [
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Poll Feed',
          description: 'Mobile mockup showing the main poll feed with animated vote bars, reaction counts, community tags, and the floating create-poll action button.',
        },
        {
          type: 'mobile-mockup',
          icon: 'chart',
          title: 'Poll Results & Analytics',
          description: 'Results screen showing real-time vote breakdown with animated pie chart, respondent count, and community engagement metrics.',
        },
        {
          type: 'mobile-mockup',
          icon: 'mobile',
          title: 'Community Discovery',
          description: 'Community discovery screen with interest-based group cards, follow/unfollow controls, trending topics, and member count indicators.',
        },
      ],
      quote: 'Built intuition for designing social interaction systems where simplicity of interface masks sophisticated real-time data architecture beneath.',
    },

    /* ────────────────────────────────────────────────
       07 · Machine Learning Projects
    ──────────────────────────────────────────────── */
    {
      slug: 'ml-projects',
      shortTitle: 'ML Projects',
      title: 'Machine Learning — Applied AI Projects Collection',
      role: 'Machine Learning Engineer',
      tagline: 'A collection of independent projects exploring data preparation, model training, and the application of AI to real-world problems.',
      gradientFrom: '#EF4444',
      gradientTo: '#F87171',
      icon: 'ai',
      tags: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Machine Learning', 'AI'],
      overview: `A structured collection of independent machine learning projects spanning supervised learning, unsupervised clustering, neural network architecture, and applied AI. Each project follows a rigorous pipeline: raw data acquisition, cleaning and feature engineering, model selection and training, hyperparameter tuning, evaluation with cross-validation, and interpretability analysis. Projects address real-world domains including image classification, natural language processing, regression modelling, and anomaly detection.`,
      metrics: [
        { value: '7+', label: 'Independent ML projects completed', accent: true },
        { value: 'End-to-End', label: 'Data pipeline to model deployment', accent: false },
        { value: 'Multi-Domain', label: 'Vision · NLP · Regression · Anomaly Detection' },
      ],
      technicalFramework: [
        {
          label: 'Data Engineering',
          items: [
            'Python, Pandas, NumPy — data wrangling and transformation pipelines',
            'Feature engineering — normalisation, encoding, dimensionality reduction (PCA)',
            'Exploratory Data Analysis — statistical profiling and visualisation (Matplotlib, Seaborn)',
            'Dataset management — train/val/test splits with stratified sampling',
          ],
        },
        {
          label: 'Model Training & Evaluation',
          items: [
            'scikit-learn — classical ML (SVM, Random Forest, k-NN, Logistic Regression)',
            'TensorFlow / Keras — deep learning model design and training',
            'Cross-validation, ROC-AUC, confusion matrices, F1 evaluation',
            'Hyperparameter optimisation — Grid Search, Random Search, Bayesian methods',
          ],
        },
        {
          label: 'Applied AI',
          items: [
            'Convolutional Neural Networks — image classification pipelines',
            'NLP preprocessing — tokenisation, embeddings, sentiment analysis',
            'Anomaly detection — isolation forests and autoencoder-based approaches',
            'Model interpretability — SHAP values and feature importance analysis',
          ],
        },
      ],
      assets: [
        {
          type: 'diagram',
          icon: 'sitemap',
          title: 'ML Pipeline Architecture',
          description: 'End-to-end ML pipeline diagram from raw data ingestion through feature engineering, model training, evaluation, and inference output.',
        },
        {
          type: 'desktop-mockup',
          icon: 'chart',
          title: 'Model Evaluation Dashboard',
          description: 'Jupyter Notebook / dashboard view showing training/validation loss curves, confusion matrix, ROC curve, and feature importance rankings.',
        },
        {
          type: 'photo',
          icon: 'camera',
          title: 'Project Portfolio Overview',
          description: 'Visual summary card of all completed ML projects — domain, algorithm family, dataset size, and key evaluation metric per project.',
        },
      ],
      quote: 'Working through the full ML lifecycle — from messy data to evaluated model — gave me a rigorous, engineering-first approach to artificial intelligence.',
    },

  ];

  getBySlug(slug: string): CaseStudy | undefined {
    return this.projects.find(p => p.slug === slug);
  }

  getOthers(slug: string, limit = 3): CaseStudy[] {
    return this.projects.filter(p => p.slug !== slug).slice(0, limit);
  }
}
