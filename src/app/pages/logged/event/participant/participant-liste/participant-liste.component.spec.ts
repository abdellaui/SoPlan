/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ParticipantListeComponent } from './participant-liste.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HistoryMemoryService } from '@services/history-memory/history-memory.service';

enum PersonView { TABLE, PROCESS }

describe('ParticipantListeComponent', () => {
  let component: ParticipantListeComponent;
  let fixture: ComponentFixture<ParticipantListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ParticipantListeComponent],
      providers: [HistoryMemoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back to tableview', () => {
    component.backToTableView();

    expect(component.currentView).toEqual(PersonView.TABLE);
    expect(component.selectedPerson).toEqual([]);
  });

  it('should\'nt show Userprocess', () => {
    expect(component.showUserProcess()).toBe(false);
  });
});
