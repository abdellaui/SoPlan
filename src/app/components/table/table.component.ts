import { Component, OnInit } from '@angular/core';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  settings = {
    delete: {
      confirmDelete: true
    },
    add: {
      confirmAdd: true
    },
    edit: {
      confirmEdit: true
    },
    columns: {
      id: {
        title: 'ID',
        editable: false,
        width: '30px'
      },
      firstname: {
        title: 'Vorname'
      },
      surname: {
        title: 'Nachname'
      },
      mail: {
        title: 'Mail'
      },
      mobile: {
        title: 'Handynummer'
      },
      street: {
        title: 'Straße'
      },
      city: {
        title: 'Stadt'
      }
    }
  };

  data;

  constructor(private ipc: IpcRendererService) { }

  onDeleteConfirm(event) {
    if (window.confirm('Sind sie sicher?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Sind sie sicher?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Sind sie sicher?')) {
      console.log(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.ipc.get('get/person/all').then((result: any) => {
      if (result !== 0) {
        this.data = result.map(obj => {
          // let rObj = {
          //   id: obj.id,
          //   firstname: obj.firstname,
          //   surname: obj.surname,
          //   mail: obj.communication.mail
          // };
          return {
            id: obj.id,
            firstname: obj.firstname,
            surname: obj.surname,
            mail: obj.communication.mail,
            mobile: obj.communication.mobile,
            street: obj.location.street,
            city: obj.location.city
          };
        });
      }
    });
  }

}
