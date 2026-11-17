
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  URL?: string;
  icon: string;
  githubUrl?: string;
  liveUrl?: string;
  type: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  projects: Project[] = [
    {
      title: 'User Management System',
      category: 'Full Stack Development',
      description:
        'A full-stack application developed to manage user records with search, filtering and CRUD functionality.',
      technologies: [
        'Angular',
        'TypeScript',
        'Node.js',
        'Express.js',
        'MongoDB',
        'RxJS',
        'Angular Material',
        'Angular Router',
        'Bootstrap',
        'HTML5',
        'CSS'
      ],
      features: [
        'User listing and management',
        'Search and filtering',
        'REST API integration',
        'Responsive user interface'
      ],
      icon: 'users',
      type: 'Personal Project'
    },
    {
      title: 'Personal Portfolio Website',
      category: 'Full Stack Development',
      description:
        'A responsive developer portfolio to showcase professional experience, technical skills and projects.',
      technologies: [
        'Angular',
        'TypeScript',
        'HTML5',
        'CSS3',
        'Node.js',
        'Express.js',
        'MongoDB',
      ],
      features: [
        'Responsive design',
        'Separate navigation pages',
        'Reusable components',
        'Professional portfolio layout'
      ],
      icon: 'code',
      type: 'Personal Project'
    },
     {
      title: 'Harshit IT Solutions Website',
      category: 'Frontend Development',
      description:
        'Its a responsive website for Harshit IT Solutions, a company that provides IT services and solutions.',
      technologies: [
        'Angular',
        'TypeScript',
        'HTML5',
        'CSS3',
        'Angular Material',
        'Angular Router',
        'Bootstrap'
      ],
      features: [
        'Responsive design',
        'Separate navigation pages',
        'Reusable components',
      ],
      URL: 'https://harshithitsolutions.com/',
      icon: 'code',
      type: 'Client Project'
    }
  ];

}
