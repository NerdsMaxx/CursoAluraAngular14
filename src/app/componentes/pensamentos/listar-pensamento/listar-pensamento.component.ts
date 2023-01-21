import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;

  filtro: string = '';
  ehFavorito: boolean = false;

  constructor(private service: PensamentoService) {}

  ngOnInit() {
    this.listarPensamentos();
  }

  carregarMaisPensamentos() {
    this.service
      .listar(this.filtro, ++this.paginaAtual, this.ehFavorito)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);

        if (!listaPensamentos.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  buscarPensamento() {
    this.resetar();
    this.listarPensamentos();
  }

  mudarParaFavoritos() {
    this.ehFavorito = true;
    this.resetar();
    this.listarPensamentos();
  }

  mudarParaMural() {
    this.ehFavorito = false;
    this.resetar();
    this.listarPensamentos();
  }

  atualizarTelaDosFavoritos() {
    if (this.ehFavorito) {
      this.listaPensamentos = this.listaPensamentos.filter((pensamento) => pensamento.favorito);
    }
  }

  private listarPensamentos() {
    this.service
      .listar(this.filtro, this.paginaAtual, this.ehFavorito)
      .subscribe(
        (listaPensamentos) => (this.listaPensamentos = listaPensamentos)
      );
  }

  private resetar() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;
  }
}
