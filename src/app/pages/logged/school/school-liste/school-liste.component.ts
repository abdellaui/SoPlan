import { Component, OnInit } from '@angular/core';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { School, SchoolSchema } from '@entity/school/school.entity';
import { SmartTableConfig } from '@models/componentInput.class';

@Component({
  selector: 'app-school-liste',
  templateUrl: './school-liste.component.html',
  styleUrls: ['./school-liste.component.scss']
})
export class SchoolListeComponent implements OnInit {

  public st_config: SmartTableConfig = {
    settings: {
      header: 'Schulliste',
      showCreateButton: true,
      createButtonText: 'Neue Schule'
    },
    slotUrls: {
      getUrl: 'get/school/all',
      postUrl: 'post/school',
      deleteUrl: 'delete/school',
      editorUrl: '/logged/school/editor/'
    },
    instanceMap: {
      '': School.prototype,
      'location': Location.prototype,
    },
    memberList: [
      {
        prefix: '',
        schema: SchoolSchema,
        members: [
          'name',
        ]
      },
      {
        prefix: 'location@',
        schema: LocationSchema,
        members: ['street', 'subThoroughfare', 'postalcode', 'city']
      }
    ]
  };


  constructor() { }

  ngOnInit() {
  }

}
