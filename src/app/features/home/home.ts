import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  developerName = 'Mahesh Sudi';

  skills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'RxJS',
    'HTML5',
    'CSS3',
    'NodeJs',
    'ExpressJs',
    'MongoDB',
    'Angular Material',
    'NgRx',
    'REST API',
    'Git',
    'Bootstrap',
    'PrimeNg'
  ];

  highlights = [
    {
      value: '6+',
      title: 'Years Experience'
    },
    {
      value: 'Angular',
      title: 'Core Expertise'
    },
    {
      value: 'MEAN',
      title: 'Full Stack Learning'
    }
  ];

}