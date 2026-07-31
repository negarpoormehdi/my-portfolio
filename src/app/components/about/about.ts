import {
  Component,
  AfterViewInit,
  OnDestroy,
  signal,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyMapComponent } from '../journey-map/journey-map';

@Component({
  selector: 'app-about',
  imports: [CommonModule, JourneyMapComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {

  sectionVisible = signal(false);

  ngAfterViewInit(): void {
    setTimeout(() => this.check(), 150);
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  check(): void {
    const vh = window.innerHeight;

    // Section entrance
    const section = document.getElementById('about');
    if (section && !this.sectionVisible()) {
      if (section.getBoundingClientRect().top < vh * 0.88) {
        this.sectionVisible.set(true);
      }
    }
  }
}
