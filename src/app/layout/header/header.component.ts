import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  ngOnInit() {
    // Check if the user has a saved preference, otherwise default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const currentTheme = this.isDarkMode ? 'dark' : 'light';
    
    // 1. Update the DOM attribute
    document.body.setAttribute('data-theme', currentTheme);
    
    // 2. Save preference so it remembers on page refresh
    localStorage.getItem('theme');
    localStorage.setItem('theme', currentTheme);
  }
  constructor() { }

}
