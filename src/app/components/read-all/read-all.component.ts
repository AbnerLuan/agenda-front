import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {
 
  closed = 0;
  list: Agenda[] = [];
  listFinished: Agenda[] = [];


  constructor(private service: AgendaService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
   
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
        } else {
          this.list.push(todo);
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  finalizar(item: Agenda): void {
    item.finalizado = true;
    this.service.update(item).subscribe(() => {     
      this.service.message("Tarefa finalizada com sucesso");
      this.list = this.list.filter((agenda) => agenda.id !== item.id);
      this.closed++;
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {     
        this.service.message('Tarefa deletada com sucesso');
        this.list = this.list.filter((agenda) => agenda.id !== id);
      }
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(["finalizados"]);
  }

}