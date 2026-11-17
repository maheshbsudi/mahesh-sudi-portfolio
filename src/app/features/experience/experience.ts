
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  project: string;
  projectDescription: string;
  responsibilities: string[];
  technologies: string[];
  current?: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {

  experiences: ExperienceItem[] = [

    {
      company: 'Accenture',
      role: 'Packaged App Development Senior Analyst',
      duration: 'Nov 2023 - Feb 2026',
      location: 'India',
      description:
        'Worked on enterprise application development, building and maintaining scalable frontend solutions using Angular and modern web technologies.',

      project: 'Enterprise Web Application Development',

      projectDescription:
        'Contributed to enterprise web application development, focusing on responsive user interfaces, reusable components and API integration.',

      responsibilities: [
        'Developed reusable Angular components for enterprise applications.',
        'Implemented responsive user interfaces using HTML, SCSS and TypeScript.',
        'Integrated REST APIs and handled asynchronous data using RxJS.',
        'Worked with Angular services, routing and reactive forms.',
        'Improved application performance and code maintainability.',
        'Collaborated with cross-functional teams in Agile environments.'
      ],

      technologies: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'RxJS',
        'HTML5',
        'SCSS',
        'REST API',
        'Git'
      ]
    },

    {
      company: 'ITC Infotech',
      role: 'Angular Developer',
      duration: 'Mar 2022 - Aug 2023',
      location: 'India',

      description:
        'Contributed to frontend application development using Angular, TypeScript and modern frontend technologies.',

      project: 'Web Application Development',

      projectDescription:
        'Worked on developing and maintaining web application modules with a focus on reusable UI components and frontend functionality.',

      responsibilities: [
        'Developed Angular components and application modules.',
        'Integrated backend REST APIs with frontend applications.',
        'Implemented reactive forms and form validations.',
        'Used RxJS operators for asynchronous data handling.',
        'Fixed bugs and improved existing application functionality.',
        'Participated in code reviews and Agile development activities.'
      ],

      technologies: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'RxJS',
        'HTML',
        'CSS',
        'Bootstrap',
        'REST API'
      ]
    },

    {
      company: 'Datamatics (Bosch)',
      role: 'Angular Developer',
      duration: 'Jun 2021 - Feb 2022',
      location: 'India',

      description:
        'Worked on frontend development and application enhancements using Angular and TypeScript.',

      project: 'Enterprise Application Development',

      projectDescription:
        'Contributed to application modules, UI development and frontend-backend integration.',

      responsibilities: [
        'Developed reusable UI components using Angular.',
        'Implemented frontend business logic using TypeScript.',
        'Integrated REST APIs and handled server responses.',
        'Created responsive layouts using HTML and CSS.',
        'Worked on debugging and resolving application issues.'
      ],

      technologies: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'CSS3',
        'Bootstrap',
        'REST API'
      ]
    },

    {
      company: 'Trinity Mobility',
      role: 'Angular Developer',
      duration: 'Oct 2019 - May 2020',
      location: 'India',

      description:
        'Worked on web application development and frontend functionality using Angular.',

      project: 'Web Application Development',

      projectDescription:
        'Contributed to frontend modules and responsive application interfaces.',

      responsibilities: [
        'Developed frontend modules using Angular.',
        'Created reusable components and shared services.',
        'Implemented responsive UI using HTML and CSS.',
        'Integrated REST APIs into Angular applications.',
        'Worked on debugging and application maintenance.'
      ],

      technologies: [
        'Angular',
        'JavaScript',
        'TypeScript',
        'HTML',
        'CSS',
        'Bootstrap',
        'REST API'
      ]
    },

    {
      company: 'Prano Technosoft',
      role: 'Frontend Developer',
      duration: 'Feb 2018 - Aug 2019',
      location: 'India',

      description:
        'Started my professional development career, gaining experience in frontend development and web application technologies.',

      project: 'Frontend Web Development',

      projectDescription:
        'Worked on developing web interfaces and implementing frontend functionality.',

      responsibilities: [
        'Developed web pages using HTML, CSS and JavaScript.',
        'Implemented responsive user interface layouts.',
        'Worked on frontend functionality and UI enhancements.',
        'Collaborated with team members to deliver application features.',
        'Fixed UI issues and supported application maintenance.'
      ],

      technologies: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Bootstrap',
        'jQuery'
      ]
    }

  ];

}
