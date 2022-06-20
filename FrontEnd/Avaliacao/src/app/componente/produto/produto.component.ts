import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/Produto';
import { ProdutosService } from 'src/app/produtos.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutosComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  produtos : Produto[];


  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(
    private produtosService: ProdutosService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.produtosService.PegarTodos().subscribe(resultado=>
      this.produtos = resultado);
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;
    this.tituloFormulario = 'Novo Produto';
    this.formulario = new  FormGroup({
      //forms controle são os inputs
      nome: new FormControl(null),
      descricao: new FormControl(null),
      preco: new FormControl(null),
      imgUrl: new FormControl(null)

    });
  }
  ExibirFormularioAtualizacao(produtoId): void {
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.produtosService.PegarPeloId(produtoId).subscribe(resultado=> {
      this.tituloFormulario = `Atualizar: ${resultado.nome}`;

      this.formulario = new  FormGroup({
         //forms controle são os inputs
         produtoId: new FormControl(resultado.produtoId),
        nome: new FormControl(resultado.nome),
        descricao: new FormControl(resultado.descricao),
        preco: new FormControl(resultado.preco),
        imgUrl: new FormControl(resultado.imgUrl)
      });
    });
  }
  EnviarFormulario(): void{
    //criar as variaveis para ter os dados do form
    const produto: Produto = this.formulario.value;

    if(produto.produtoId != null){
      this.produtosService.AtualizarProduto(produto).subscribe(resultado=> {
        this.visibilidadeFormulario=false;
        this.visibilidadeTabela=true;
        this.toastr.warning('Atualizado com Sucesso!');
        this.produtosService.PegarTodos().subscribe(registros => {
          this.produtos = registros
        });
      });
    }
    else {
    this.produtosService.SalvarProduto(produto).subscribe((resultado) =>{
      this.visibilidadeTabela=true;
      this.visibilidadeFormulario=false;
      this.toastr.success('Inserido com Sucesso!');
      this.produtosService.PegarTodos().subscribe(registros=> {
      this.produtos= registros
      });
    });
    }
  }

    voltar(): void{
      this.visibilidadeTabela=true;
      this.visibilidadeFormulario=false;
    }
    ExcluirProduto(produtoId) {

      this.produtosService.ExcluirProduto(produtoId).subscribe((resultado) =>{
        this.visibilidadeTabela=true;
        this.visibilidadeFormulario=false;
        this.toastr.error('Registro deletado', )
        this.produtosService.PegarTodos().subscribe(registros=> {
        this.produtos= registros
        });
      });
   }
}
