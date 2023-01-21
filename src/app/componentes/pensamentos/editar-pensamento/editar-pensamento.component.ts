import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { CustomValidators } from 'src/app/validacao/custom-validators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  formulario!: FormGroup;

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.service.buscarPorId(id!).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [
          pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        autoria: [
          pensamento.autoria,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            CustomValidators.lowerCase,
          ]),
        ],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito],
      });
    });
  }

  editarPensamento() {
    this.service
      .editar(this.formulario.value)
      .subscribe(() => this.router.navigate(['/listarPensamento']));
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao() {
    return this.formulario.valid ? 'botao' : 'botao__desabilitado';
  }
}
