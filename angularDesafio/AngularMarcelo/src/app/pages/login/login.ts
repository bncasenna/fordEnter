import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuarioInput: string = '';
  senhaInput: string = '';
  erroMensagem: string = '';

  constructor(private router: Router) {}

  efetuarLogin(): void {
    if (this.usuarioInput === 'admin' && this.senhaInput === '123456') {
      this.erroMensagem = '';
      this.router.navigate(['/home']);
    } else {
      this.erroMensagem = 'Usuário ou senha incorretos.';
    }
  }
}