import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agenda } from 'src/app/models/agenda';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

  listFinished: Agenda[] = [];

  constructor(private service: AgendaService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((agenda) => {
        if (agenda.finalizado) {
          this.listFinished.push(agenda);
        }
      });
    });
  }

  voltar(): void {
    this.router.navigate([''])
  }
}
