import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

interface Veiculo {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

interface DadosTelemetria {
  vin: string;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
  })
export class Dashboard implements OnInit {
  menuAberto: boolean = false;
  
  listaVeiculos: Veiculo[] = [];
  veiculoSelecionadoId: number = 1;
  veiculoDadosAtuais?: Veiculo;

  buscaVin: string = '2FRHDUYS2Y63NHD22454';
  dadosTelemetria?: DadosTelemetria;
  mensagemErroTabela: string = '';

  vinPorVeiculo: { [key: number]: string } = {
    1: '2FRHDUYS2Y63NHD22454',
    2: '2RFAASDY54E4HDU34874',
    3: '2FRHDUYS2Y63NHD22455',
    4: '2RFAASDY54E4HDU34875' 
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarVeiculos();
    this.buscarDadosTabela();
  }

  carregarVeiculos(): void {
    this.http.get<{ vehicles: Veiculo[] }>('http://localhost:3001/vehicles').subscribe({
      next: (resposta) => {
        this.listaVeiculos = resposta.vehicles;
        this.atualizarModeloSelecionado();
      },
      error: (err) => console.error('Erro ao buscar veículos:', err)
    });
  }

  atualizarModeloSelecionado(): void {
    this.veiculoDadosAtuais = this.listaVeiculos.find(v => Number(v.id) === Number(this.veiculoSelecionadoId));

    if (this.veiculoSelecionadoId && this.vinPorVeiculo[this.veiculoSelecionadoId]) {
      this.buscaVin = this.vinPorVeiculo[this.veiculoSelecionadoId];
      this.buscarDadosTabela(); 
    }
  }

  buscarDadosTabela(): void {
    if (!this.buscaVin.trim()) {
      this.dadosTelemetria = undefined;
      this.mensagemErroTabela = 'Digite um código VIN para buscar.';
      return;
    }

    this.http.post<any>('http://localhost:3001/vehicleData', { vin: this.buscaVin.trim() }).subscribe({
      next: (resposta) => {
        this.dadosTelemetria = {
          vin: this.buscaVin.trim(),
          ...resposta
        };
        this.mensagemErroTabela = '';
      },
      error: (err) => {
        this.dadosTelemetria = undefined;
        this.mensagemErroTabela = err.error?.message || 'Código VIN não encontrado!';
      }
    });
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  efetuarLogout(): void {
    this.router.navigate(['/login']);
  }
}