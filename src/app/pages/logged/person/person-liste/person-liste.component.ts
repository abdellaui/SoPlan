import { Component, OnInit } from '@angular/core';
import { Person } from '@entity/person/person.entity';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-person-liste',
  templateUrl: './person-liste.component.html',
  styleUrls: ['./person-liste.component.scss']
})
export class PersonListeComponent implements OnInit {

  public personListe: Person[];
  constructor(private ipc: IpcRendererService) { }

  ngOnInit() {
    this.ipc.get('get/person/all').then((result: any) => {
      if (result !== 0) {
        this.personListe = result;
      }
    });
  }

}
