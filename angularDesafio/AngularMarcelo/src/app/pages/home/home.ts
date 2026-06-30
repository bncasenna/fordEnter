import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  menuAberto: boolean = false;
  
  constructor(private router: Router) {}
  efetuarLogout(): void {
    this.router.navigate(['/login']);
  }
  alternarMenu(): void{
    this.menuAberto = !this.menuAberto;
  }

}