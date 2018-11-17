import { Component, OnInit } from '@angular/core';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      columnTitle: ''
    },
    delete: {
      confirmDelete: true
    },
    edit: {
      confirmSave: true,
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
      gender: {
        title: 'Geschlecht'
      },
      mail: {
        title: 'Mail'
      },
      mobile: {
        title: 'Handynummer'
      },
      phone: {
        title: 'Tel.-Nr'
      },
      street: {
        title: 'Straße'
      },
      city: {
        title: 'Stadt'
      },
      postalcode: {
        title: 'PLZ'
      }
    }
  };

  data;

  constructor(private ipc: IpcRendererService) { }

  // TODO: Fürs Löschen einen Slot implementieren
  onDeleteConfirm(event) {
    if (window.confirm('Es wird zurzeit nicht gelöscht')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Sind sie sicher?')) {
      this.ipc.get('post/person', {
        id: event.newData.id,
        firstname: event.newData.firstname,
        surname: event.newData.surname,
        communication: {
          mail: event.newData.mail,
          mobile: event.newData.mobile,
        },
        location: {
          street: event.newData.street,
          city: event.newData.city
        }
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Sind sie sicher?')) {
      console.log(event);
      this.ipc.get('post/person', {
        id: event.newData.id,
        firstname: event.newData.firstname,
        surname: event.newData.surname,
        communication: {
          mail: event.newData.mail,
          mobile: event.newData.mobile,
        },
        location: {
          street: event.newData.street,
          city: event.newData.city
        }
      });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit() {
    this.ipc.get('get/person/all').then((result: any) => {
      if (result !== 0) {
        console.log(result);
        this.data = result.map(obj => {
          return {
            id: obj.id,
            firstname: obj.firstname,
            surname: obj.surname,
            gender: (obj.gender === 'm') ? 'männlich' : ((obj.gender === 'w') ? 'weiblich' : 'diverse'),
            mail: obj.communication.mail,
            mobile: obj.communication.mobile,
            phone: obj.communication.phone,
            street: obj.location.street,
            city: obj.location.city,
            postalcode: obj.location.postalcode
          };
        });
      }
    });
  }

}
