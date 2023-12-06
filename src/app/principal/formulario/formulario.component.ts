import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelo/Cliente';
import { ClienteService } from 'src/app/servico/cliente.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  id!: number;
  operacao!: string;

  cliente: Cliente = new Cliente();

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;
  cancelar: any;

  constructor(private _cliente: ClienteService,
    private routeActive: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    /* this.cliente = this.data.cliente; */
  }

  ngOnInit(): void {
    if (this.id && this.operacao == 'atualizar') {
      this._cliente.pegaOne(this.id).subscribe(response => {
        this.cliente = response;
        console.log(this.cliente);
      },
        error => {
          console.error(error);
        }
      );
    }
  }

  executa(): void {
    switch (this.operacao) {
      case 'atualizar':
        this.atualizar(this.id);
        break
      case 'cadastrar':
        this.cadastrar();
        break
    }
  }

  cadastrar(): void {
    this._cliente.cadastrar(this.cliente).subscribe(resposta => {
      console.log(resposta);

      alert("Cadastrado com sucesso!");

      this.dialog.closeAll();
    }, error => {
      console.log(error.error);
    })
  }

  atualizar(id: number): void {
    this._cliente.editar(this.cliente).subscribe(
      (response) => {
        alert("Cliente atualizado com sucesso!");
        console.log('Cliente atualizado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao atualizar o cliente:', error);
        // Pode adicionar lógica adicional aqui, como exibir uma mensagem de erro
      });
  }

  fechar(): void {
    this.dialog.closeAll();
  }

}
