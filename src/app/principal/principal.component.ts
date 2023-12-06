import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  //objeto cliente
  cliente: Cliente = new Cliente();
  selecionaCliente: Cliente = new Cliente;

  titulo: string = '';
  mostrarFormNovoCliente: any;

  // método com parametro nome para buscar com base na API.
  buscarCliente(): void {
    console.log('Nome:', this.titulo); // Verifique se o nome está correto
    if (this.titulo === '') {
      this.buscar(); // Carrega a primeira página ao limpar o filtro
    } else {
      this.servico.filtrar(this.titulo).subscribe(response => {
        console.log('Response:', response); // Verifique a resposta da API
        this.clientes = response; // Atribui diretamente à propriedade clientes
      });
    }
  }

  /*
  consultarFiltro() {

  }
  */

  // Variável para visibilidade dos botões
  btnCadastro: boolean = true;

  //visibilidade da tabela
  tabela: boolean = true;

  // JSON de clientes
  clientes: Cliente[] = [];

  //construtor
  constructor(private servico: ClienteService,
    public dialog: MatDialog) { }

  // Método de seleção
  buscar(): void {
    this.servico.listar().subscribe(retorno => {
      this.clientes = retorno;
    });
  }

  // Método para selecionar um cliente específico
  selecionarCliente(cliente: Cliente): void {
    this.selecionaCliente = cliente;
    console.log(this.selecionaCliente);
  }

  // Método para remover clientes
  remover(id: number): void {
    const confirmacao = window.confirm('Tem certeza que deseja deletar este item?');

    if (confirmacao) {
      this.servico.remover(id).subscribe(retorno => {
        // Adicione qualquer lógica adicional após a remoção, se necessário
        this.buscar();
      });
    } else {
      // Lógica a ser executada se o usuário clicar em "Cancelar" no alerta de confirmação
      console.log('Remoção cancelada pelo usuário.');
    }
  }

  //inicialização
  ngOnInit() {
    this.buscar();
    this.buscarCliente();
  }

  abreModalFormulario(id: number, operacao: string): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      disableClose: false, // não deixa o usuario fechar o modal se clicar fora do modal
      maxHeight: "90vh",
      maxWidth: "90vw"
    });

    dialogRef.componentInstance.id = id; // instancia entre componentes
    dialogRef.componentInstance.operacao = operacao;

    dialogRef.afterClosed().subscribe(result => {
      this.buscar();
    })
  }

}
