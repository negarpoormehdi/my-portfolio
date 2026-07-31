import { Component } from '@angular/core';
import { NavbarComponent }           from '../../components/navbar/navbar';
import { HeroComponent }             from '../../components/hero/hero';
import { AcademicTimelineComponent } from '../../components/academic-timeline/academic-timeline';
import { StackComponent }            from '../../components/stack/stack';
import { AboutComponent }            from '../../components/about/about';
import { ContactComponent }          from '../../components/contact/contact';
import { FooterComponent }           from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HeroComponent,
    AcademicTimelineComponent,
    StackComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
