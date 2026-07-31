import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  signal,
  HostListener,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Station {
  id: string;
  label: string;
  year: string;
  role: string;
  place: string;
  story: string;
  skills: string[];
  x: number;
  y: number;
  icon: string;
  color: string;
  accentColor: string;
}

interface Vec2 { x: number; y: number; }

@Component({
  selector: 'app-journey-map',
  imports: [CommonModule],
  templateUrl: './journey-map.html',
  styleUrl: './journey-map.scss',
})
export class JourneyMapComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLDivElement>;

  charPos  = signal<Vec2>({ x: 8, y: 58 });
  target   = signal<Vec2>({ x: 8, y: 58 });
  moving   = signal(false);
  facing   = signal<'left' | 'right'>('right');
  walkFrame = signal(0);

  activeStation = signal<Station | null>(null);
  visitedIds    = signal<Set<string>>(new Set());
  trail         = signal<Vec2[]>([]);

  stations: Station[] = [
    {
      id: 'biomed',
      label: 'BIOMED',
      year: '2018 – 2022',
      role: 'Biomedical Engineering Student',
      place: 'University',
      story: 'Started with a deep curiosity for the human body — circuits, biosignals, and medical devices. Built the analytical mindset that still drives every architecture decision I make today.',
      skills: ['Signal Processing', 'Circuit Design', 'MATLAB', 'Research'],
      x: 12, y: 58,
      icon: '🧬',
      color: '#7C3AED',
      accentColor: 'rgba(124,58,237,0.12)',
    },
    {
      id: 'mrl',
      label: 'MRL LAB',
      year: '2022 – 2023',
      role: 'Robotics Researcher',
      place: 'MRL — Mobile Robotics Lab',
      story: 'Joined one of Iran\'s top robotics research teams. Worked on real-time robot control, sensor fusion, and autonomous behavior. One late night debugging a controller loop — code clicked like never before.',
      skills: ['ROS', 'C++', 'Python', 'Sensor Fusion', 'Control Systems'],
      x: 45, y: 32,
      icon: '🤖',
      color: '#6D5EF7',
      accentColor: 'rgba(109,94,247,0.12)',
    },
    {
      id: 'pivot',
      label: 'THE PIVOT',
      year: '2023',
      role: 'The Turning Point',
      place: 'Late Night Debugging Session',
      story: 'Everything changed in a single moment — a robot controller bug led to a beautiful Flutter app idea. Switched focus entirely to software. Flutter, Angular, clean architecture. Never looked back.',
      skills: ['Flutter', 'Dart', 'Angular', 'TypeScript'],
      x: 72, y: 62,
      icon: '💡',
      color: '#F472B6',
      accentColor: 'rgba(244,114,182,0.12)',
    },
    {
      id: 'dev',
      label: 'FULL-STACK',
      year: '2024 – Now',
      role: 'Mobile & Frontend Engineer',
      place: 'Building Products',
      story: 'Shipping high-performance apps used by thousands of users. Leading frontend architecture, design systems, and cross-platform mobile products. The girl who started with anatomy books now architects elegant digital systems.',
      skills: ['Flutter', 'Angular', 'Firebase', 'CI/CD', 'Design Systems'],
      x: 88, y: 38,
      icon: '🚀',
      color: '#34D399',
      accentColor: 'rgba(52,211,153,0.12)',
    },
  ];

  private animId!: number;
  private walkTimer!: ReturnType<typeof setInterval>;
  private trailTimer!: ReturnType<typeof setInterval>;
  private lastMouseTime = 0;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.walkTimer = setInterval(() => {
      if (this.moving()) this.walkFrame.update(f => (f + 1) % 4);
      else this.walkFrame.set(0);
    }, 160);

    this.trailTimer = setInterval(() => {
      this.trail.update(t => t.slice(-16));
    }, 60);

    this.zone.runOutsideAngular(() => {
      const loop = () => {
        this.animId = requestAnimationFrame(loop);
        this.tick();
      };
      loop();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    clearInterval(this.walkTimer);
    clearInterval(this.trailTimer);
  }

  onCanvasMove(e: MouseEvent): void {
    // Throttle to ~60fps
    const now = Date.now();
    if (now - this.lastMouseTime < 16) return;
    this.lastMouseTime = now;

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px   = ((e.clientX - rect.left) / rect.width)  * 100;
    const py   = ((e.clientY - rect.top)  / rect.height) * 100;
    const tx   = Math.max(3, Math.min(97, px));
    const ty   = Math.max(12, Math.min(85, py));

    this.zone.run(() => {
      this.facing.set(tx > this.charPos().x ? 'right' : 'left');
      this.target.set({ x: tx, y: ty });
      this.moving.set(true);
    });
  }

  onCanvasLeave(): void {
    this.zone.run(() => this.moving.set(false));
  }

  private tick(): void {
    const pos  = this.charPos();
    const tgt  = this.target();
    const dx   = tgt.x - pos.x;
    const dy   = tgt.y - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 0.35) {
      this.zone.run(() => {
        this.charPos.set(tgt);
        this.moving.set(false);
        this.checkNearStation(tgt);
      });
      return;
    }

    // Ease-in speed based on distance
    const speed = Math.min(0.08 + dist * 0.004, 0.22);
    const newPos = { x: pos.x + dx * speed, y: pos.y + dy * speed };

    this.zone.run(() => {
      this.charPos.set(newPos);
      // Add trail
      this.trail.update(t => [...t, { x: newPos.x, y: newPos.y }]);
      this.checkNearStation(newPos);
    });
  }

  private checkNearStation(pos: Vec2): void {
    for (const s of this.stations) {
      const dx = pos.x - s.x;
      const dy = pos.y - s.y;
      if (Math.sqrt(dx * dx + dy * dy) < 9) {
        if (this.activeStation()?.id !== s.id) {
          this.activeStation.set(s);
          this.visitedIds.update(v => new Set([...v, s.id]));
        }
        return;
      }
    }
    if (this.activeStation()) this.activeStation.set(null);
  }

  isVisited(id: string): boolean {
    return this.visitedIds().has(id);
  }

  get allVisited(): boolean {
    return this.visitedIds().size === this.stations.length;
  }

  get trailPoints(): string {
    return this.trail().map(p => `${p.x},${p.y}`).join(' ');
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    const arrows = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
    if (!arrows.includes(e.key)) return;
    e.preventDefault();
    const pos = this.charPos();
    let { x, y } = pos;
    const step = 3.5;
    if (e.key === 'ArrowRight') { x += step; this.facing.set('right'); }
    if (e.key === 'ArrowLeft')  { x -= step; this.facing.set('left');  }
    if (e.key === 'ArrowUp')    y -= step;
    if (e.key === 'ArrowDown')  y += step;
    x = Math.max(3, Math.min(97, x));
    y = Math.max(12, Math.min(85, y));
    this.charPos.set({ x, y });
    this.target.set({ x, y });
    this.checkNearStation({ x, y });
  }
}
