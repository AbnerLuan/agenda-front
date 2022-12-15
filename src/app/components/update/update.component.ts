import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  agenda: Agenda = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: AgendaService, private route: ActivatedRoute) { }

  ngOnInit(): void {  
    this.agenda.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();  
  }

  findById(): void{
    this.service.findById(this.agenda.id).subscribe((resposta) => {
      this.agenda = resposta;
    })
  }

  update(): void {
    this.service.update(this.agenda).subscribe((resposta) => {
      this.service.message('Tarefa atualizada com sucesso!');
      this.router.navigate(['']);
    }, error => {
      this.service.message('Falha ao atualizar tarefa.');
      this.router.navigate(['']);
    })
  }


  cancel(): void {
    this.router.navigate(['']);
  }

  formataData(): void {
    let data = new Date(this.agenda.dataParaFinalizar)
    this.agenda.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1 }/${data.getFullYear()}`
  }

}

