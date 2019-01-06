/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormBuilderSettings } from '@models/componentInput.class';
import { I18n } from '@models/translation/i18n.class';
import { NbPopoverModule } from '@nebular/theme';
import { FormBuilderComponent } from './form-builder.component';
import { By } from '@angular/platform-browser';

import { School, SchoolSchema } from '@entity/school/school.entity';
import { Location, LocationSchema } from '@entity/_location/location.entity';
import { Communication, CommunicationSchema } from '@entity/_communication/communicaton.entity';
import { Comment, CommentSchema } from '@entity/comment/comment.entity';
import { Room, RoomSchema } from '@entity/_room/room.entity';
import { Bedroom, BedroomSchema } from '@entity/bedroom/bedroom.entity';
import { Event, EventSchema } from '@entity/event/event.entity';
import { Group, GroupSchema } from '@entity/group/group.entity';
import { group } from '@angular/animations';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  let formDe: DebugElement;
  let formEl: HTMLElement;

  let schoolInstance: School;
  let locationInstance: Location;
  let communicationInstance: Communication;
  let roomInstance: Room;
  let bedroomInstance: Bedroom;
  let commentInstance: Comment;
  let eventInstance: Event;
  let groupInstance: Group;

  const form_schoolSettings: FormBuilderSettings = <FormBuilderSettings>{
    header: I18n.resolve('form_info'),
    buttons: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderComponent],
      imports: [
        FormsModule,
        NbPopoverModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;

    schoolInstance = new School();
    locationInstance = new Location();
    communicationInstance = new Communication();
    roomInstance = new Room();
    bedroomInstance = new Bedroom();
    commentInstance = new Comment();
    eventInstance = new Event();
    groupInstance = new Group();

    component.schema = LocationSchema;
    component.write = locationInstance;
    component.settings = form_schoolSettings;

    fixture.detectChanges();
    formDe = fixture.debugElement;
    formEl = formDe.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form for location', () => {
    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('location_street'));
    expect(labelsEl.item(1).textContent).toContain(I18n.resolve('location_house_number'));
    expect(labelsEl.item(2).textContent).toContain(I18n.resolve('location_postalcode'));
    expect(labelsEl.item(3).textContent).toContain(I18n.resolve('location_city'));
    expect(labelsEl.item(4).textContent).toContain(I18n.resolve('location_country'));
  });

  it('should create form for school', () => {
    component.schema = SchoolSchema;
    component.write = schoolInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('school_name'));
  });

  it('should create form for communication', () => {
    component.schema = CommunicationSchema;
    component.write = communicationInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('communication_landline'));
    expect(labelsEl.item(1).textContent).toContain(I18n.resolve('communication_mobile'));
    expect(labelsEl.item(2).textContent).toContain(I18n.resolve('communication_mail'));
  });

  it('should create form for room', () => {
    component.schema = RoomSchema;
    component.write = roomInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('room_floor'));
    expect(labelsEl.item(1).textContent).toContain(I18n.resolve('room_corridor'));
    expect(labelsEl.item(2).textContent).toContain(I18n.resolve('room_number'));
    expect(labelsEl.item(3).textContent).toContain(I18n.resolve('room_name'));
    expect(labelsEl.item(4).textContent).toContain(I18n.resolve('room_capacity'));
  });

  it('should create form for bedroom', () => {
    component.schema = BedroomSchema;
    component.write = bedroomInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('bedroom_type'));
  });

  it('should create form for comment', () => {
    component.schema = CommentSchema;
    component.write = commentInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('comment_content'));
  });

  it('should create form for event', () => {
    component.schema = EventSchema;
    component.write = eventInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('event_name'));
    expect(labelsEl.item(1).textContent).toContain(I18n.resolve('event_start'));
    expect(labelsEl.item(2).textContent).toContain(I18n.resolve('event_end'));
  });

  it('should create form for group', () => {
    component.schema = GroupSchema;
    component.write = groupInstance;

    fixture.detectChanges();

    const labelsEl = formEl.querySelectorAll('div label');

    expect(labelsEl.item(0).textContent).toContain(I18n.resolve('group_name'));
    expect(labelsEl.item(1).textContent).toContain(I18n.resolve('group_capacity'));
  });

});
