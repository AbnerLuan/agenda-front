import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  agenda: Agenda = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: AgendaService) { }

  ngOnInit(): void {
    
  }

  create(): void {
    this.formataData()
    this.service.create(this.agenda).subscribe((resposta) => {
      this.service.message('Tarefa criada com sucesso');
      this.router.navigate([''])      
    }, err => {
      this.service.message('Falha ao criar tarefa, Tarefa não foi criada!');
      this.router.navigate(['']) 
    })
   // console.log(this.agenda.dataParaFinalizar);
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  formataData(): void {
    let data = new Date(this.agenda.dataParaFinalizar)
    this.agenda.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1 }/${data.getFullYear()}`
  }

}
