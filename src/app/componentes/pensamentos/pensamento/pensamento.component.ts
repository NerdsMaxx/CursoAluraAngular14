import { Pensamento } from './../pensamento';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input()
  pensamento!: Pensamento;

  @Output()
  avisoFavoritoFoiMudado = new EventEmitter<void>();

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento() {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }

    return 'pensamento-p';
  }

  mudarIconeFavorito() {
    if (this.pensamento.favorito === false) {
      return 'inativo';
    }

    return 'ativo';
  }

  atualizarFavorito() {
    this.service.mudarFavorito(this.pensamento).subscribe();
    this.avisoFavoritoFoiMudado.emit();
  }
}
