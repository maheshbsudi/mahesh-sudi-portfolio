
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Skill {
  name: string;
  shortName: string;
}

interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {

  categories: SkillCategory[] = [

    {
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces.',
      icon: '01',
      skills: [
        { name: 'Angular', shortName: 'A' },
        { name: 'TypeScript', shortName: 'TS' },
        { name: 'JavaScript', shortName: 'JS' },
        { name: 'HTML5', shortName: 'H5' },
        { name: 'CSS3', shortName: 'C3' },
        { name: 'SCSS', shortName: 'SC' },
        { name: 'Angular Material', shortName: 'AM' },
        { name: 'Bootstrap', shortName: 'BS' }
      ]
    },

    {
      title: 'Angular Expertise',
      description: 'Advanced Angular concepts and application architecture.',
      icon: '02',
      skills: [
        { name: 'Standalone Components', shortName: 'SC' },
        { name: 'Angular Routing', shortName: 'AR' },
        { name: 'Lazy Loading', shortName: 'LL' },
        { name: 'Reactive Forms', shortName: 'RF' },
        { name: 'Signals', shortName: 'SG' },
        { name: 'Change Detection', shortName: 'CD' },
        { name: 'Directives & Pipes', shortName: 'DP' },
        { name: 'Dependency Injection', shortName: 'DI' },
        { name: 'Route Guards', shortName: 'RG' },
        { name: 'HTTP Interceptors', shortName: 'HI' }
      ]
    },

    {
      title: 'RxJS & State Management',
      description: 'Managing asynchronous data and application state.',
      icon: '03',
      skills: [
        { name: 'Observables', shortName: 'OB' },
        { name: 'Subjects', shortName: 'SB' },
        { name: 'BehaviorSubject', shortName: 'BS' },
        { name: 'switchMap', shortName: 'SM' },
        { name: 'mergeMap', shortName: 'MM' },
        { name: 'forkJoin', shortName: 'FJ' },
        { name: 'debounceTime', shortName: 'DT' },
        { name: 'shareReplay', shortName: 'SR' },
        { name: 'NgRx', shortName: 'NX' }
      ]
    },

    {
      title: 'Backend Development',
      description: 'Building backend services and database integration.',
      icon: '04',
      skills: [
        { name: 'Node.js', shortName: 'ND' },
        { name: 'Express.js', shortName: 'EX' },
        { name: 'MongoDB', shortName: 'MG' },
        { name: 'Mongoose', shortName: 'MS' },
        { name: 'REST APIs', shortName: 'API' },
        { name: 'JWT Authentication', shortName: 'JWT' }
      ]
    },

    {
      title: 'Tools & Testing',
      description: 'Development tools, debugging and quality assurance.',
      icon: '05',
      skills: [
        { name: 'Git', shortName: 'GT' },
        { name: 'GitHub', shortName: 'GH' },
        { name: 'VS Code', shortName: 'VS' },
        { name: 'Postman', shortName: 'PM' },
        { name: 'Chrome DevTools', shortName: 'CD' },
        { name: 'Jest', shortName: 'JT' },
        { name: 'Jasmine', shortName: 'JM' },
        { name: 'Cypress', shortName: 'CY' }
      ]
    },

    {
      title: 'Performance & Best Practices',
      description: 'Creating scalable and high-performance applications.',
      icon: '06',
      skills: [
        { name: 'Lazy Loading', shortName: 'LL' },
        { name: 'Code Splitting', shortName: 'CS' },
        { name: 'OnPush Strategy', shortName: 'OP' },
        { name: 'Virtual Scrolling', shortName: 'VS' },
        { name: 'API Optimization', shortName: 'AO' },
        { name: 'Memory Management', shortName: 'MM' },
        { name: 'Reusable Components', shortName: 'RC' },
        { name: 'Clean Code', shortName: 'CC' }
      ]
    }

  ];

  get totalSkills(): number {
    return this.categories.reduce(
      (total, category) => total + category.skills.length,
      0
    );
  }

}
