import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  signal,
  QueryList,
  ViewChildren,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('contactCard') cardRefs!: QueryList<ElementRef<HTMLElement>>;

  // ── Scroll-in cards ──────────────────────────────────────
  visibleCards = signal<Set<number>>(new Set());
  headerVisible = signal(false);

  // ── Typing animation ─────────────────────────────────────
  private readonly words = ['Together.', 'Something Great.', 'The Future.', 'With Purpose.'];
  private wordIndex  = 0;
  private charIndex  = 0;
  private isDeleting = false;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  displayedWord = signal('');
  showCursor    = signal(true);
  private cursorInterval: ReturnType<typeof setInterval> | null = null;

  // ── Contact cards data ───────────────────────────────────
  contactCards = [
    {
      icon: 'email',
      label: 'Email',
      action: 'Send a message',
      href: 'mailto:negar.poormehdi.personal@gmail.com',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      action: 'Connect with me',
      href: 'https://linkedin.com/in/negar-poormehdi-ab0696345',
    },
    {
      icon: 'github',
      label: 'GitHub',
      action: 'Check my code',
      href: 'https://github.com/negarpoormehdi',
    },
  ];

  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    this.cursorInterval = setInterval(() => {
      this.showCursor.update(v => !v);
    }, 530);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkVisibility(), 200);
  }

  ngOnDestroy(): void {
    if (this.typeTimer)      clearTimeout(this.typeTimer);
    if (this.cursorInterval) clearInterval(this.cursorInterval);
  }

  // ── Scroll trigger ───────────────────────────────────────
  @HostListener('window:scroll')
  checkVisibility(): void {
    const vh = window.innerHeight;

    // Header + typing trigger
    const headerEl = document.getElementById('contact-header');
    if (headerEl && !this.headerVisible()) {
      const rect = headerEl.getBoundingClientRect();
      if (rect.top < vh * 0.85) {
        this.headerVisible.set(true);
        // Start typing once header enters view
        setTimeout(() => this.startTyping(), 400);
      }
    }

    // Cards
    this.cardRefs.forEach((ref, i) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (rect.top < vh * 0.88) {
        this.visibleCards.update(prev => {
          if (prev.has(i)) return prev;
          const next = new Set(prev);
          next.add(i);
          return next;
        });
      }
    });
  }

  isCardVisible(i: number): boolean {
    return this.visibleCards().has(i);
  }

  // ── Typing logic ─────────────────────────────────────────
  private typingStarted = false;

  private startTyping(): void {
    if (this.typingStarted) return;
    this.typingStarted = true;
    this.tick();
  }

  private tick(): void {
    const current      = this.words[this.wordIndex];
    const typeSpeed    = 85;
    const deleteSpeed  = 50;
    const pauseType    = 2000;
    const pauseDelete  = 350;

    if (!this.isDeleting) {
      this.charIndex++;
      this.displayedWord.set(current.slice(0, this.charIndex));

      if (this.charIndex === current.length) {
        this.typeTimer = setTimeout(() => {
          this.isDeleting = true;
          this.tick();
        }, pauseType);
        return;
      }
    } else {
      this.charIndex--;
      this.displayedWord.set(current.slice(0, this.charIndex));

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.wordIndex  = (this.wordIndex + 1) % this.words.length;
        this.typeTimer  = setTimeout(() => this.tick(), pauseDelete);
        return;
      }
    }

    this.typeTimer = setTimeout(
      () => this.tick(),
      this.isDeleting ? deleteSpeed : typeSpeed
    );
  }
}
