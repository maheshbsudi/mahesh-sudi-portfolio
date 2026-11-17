import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { Home } from './features/home/home';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mahesh-sudi-portfolio');
}
