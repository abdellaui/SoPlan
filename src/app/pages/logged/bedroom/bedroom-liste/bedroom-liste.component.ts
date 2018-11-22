import { Component, OnInit } from '@angular/core';
import { Bedroom } from '@entity/bedroom/bedroom.entity';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-bedroom-liste',
  templateUrl: './bedroom-liste.component.html',
  styleUrls: ['./bedroom-liste.component.scss']
})
export class BedroomListeComponent implements OnInit {

  public bedroomListe: Bedroom[];
  constructor(private ipc: IpcRendererService) { }

  ngOnInit() {
    this.ipc.get('get/bedroom/all').then((result: any) => {
      if (result !== 0) {
        this.bedroomListe = result;
      }
    });
  }

}
