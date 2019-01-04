import { Component, OnInit } from '@angular/core';
import { Bedroom } from '@entity/bedroom/bedroom.entity';
import { Classroom } from '@entity/classroom/classroom.entity';
import { Event } from '@entity/event/event.entity';
import { Group } from '@entity/group/group.entity';
import { Participant, ParticipantRole } from '@entity/participant/participant.entity';
import { PersonGender } from '@entity/person/person.entity';
import { I18n } from '@models/translation/i18n.class';
import { CurrentEventService } from '@services/current-event/current-event.service';
import { IpcRendererService } from '@services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public _i18n = I18n; // for accessing in html

  public rangeObject: any;
  /***** Age Chart******/
  public ageChartType: string = null;
  public ageChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    }
  };
  public ageChartLabels = [];
  public ageChartLegend = true;
  public ageChartData = [];
  /********************/

  /***** Location Chart******/
  public locationChartType: string = null;
  public locationChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    }
  };
  public locationChartLabels = [];
  public locationChartLegend = true;
  public locationChartData = [];
  /********************/

  /***** School Chart******/
  public schoolChartType: string = null;
  public schoolChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    }
  };
  public schoolChartLabels = [];
  public schoolChartLegend = true;
  public schoolChartData = [];
  /********************/

  /******* Grade Chart *******/
  public gradeChartType: string = null;
  public gradeChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    }
  };
  public gradeChartLabels = [];
  public gradeChartLegend = true;
  public gradeChartData = [];
  /***************************/

  /***** Gender Chart *****/
  public genderChartType: string = null;
  public genderChartLabels = [];
  public genderChartData = [];
  /************************/

  /***** Role Chart *****/
  public roleChartType: string = null;
  public roleChartLabels = [];
  public roleChartData = [];
  /************************/

  /***Current Event Mangament***/
  public currentEvent: Event = null;
  public showHelp = true;
  public loading = false;
  /***************************/

  /*************COLORS */
  public genderColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#ec407a', '#81d4fa', '#e0e0e0']
    }
  ];

  public roleColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#fff176', '#ff8a65', '#ffb74d']
    }
  ];

  public ageColors: Array<any> = [
    { // all colors in order
      backgroundColor: '#90a4ae'
    }
  ];

  public gradeColors: Array<any> = [
    { // all colors in order
      backgroundColor: '#64b5f6'
    }
  ];

  public schoolColors: Array<any> = [
    { // all colors in order
      backgroundColor: '#80cbc4'
    }
  ];

  public locationColors: Array<any> = [
    {// all colors in order
      backgroundColor: '#c5e1a5'
    }
  ];
  /************* */

  /*STATISTICS FOR DASHBOARD*/
  public stat_num_participants: number = null;
  public stat_num_groups: number = null;
  public stat_num_bedrooms: number = null;
  public stat_num_classrooms: number = null;
  public stat_num_gender_f: number = null;
  public stat_num_gender_m: number = null;
  public stat_num_gender_d: number = null;
  public stat_num_role_s: number = null;
  public stat_num_role_d: number = null;
  public stat_num_role_sd: number = null;
  /**************************/
  /***Verknüpfte Enittäten vom aktuellen Event***/
  public participants: Participant[] = [];
  public groups: Group[] = [];
  public classrooms: Classroom[] = [];
  public bedrooms: Bedroom[] = [];
  /****************************************/

  /***********Data for Charts***********/
  public agearr: number[] = [];
  public gradearr: number[] = [];
  public schoolarr: number[] = [];
  public locationarr: number[] = [];
  public age_stats = new Object;
  public grade_stats = new Object;
  public location_stats = new Object;
  public school_stats = new Object;

  /*****************************************/
  public refreshCalenderRange = true;
  private initialize_Age(): void {
    this.age_stats = new Object;
    this.grade_stats = new Object;
    this.school_stats = new Object;
    this.location_stats = new Object;
    this.participants.forEach(participant => {
      const date = new Date();
      const participantDate = participant.person.birthDate.toString();

      const age = date.getFullYear() - new Date(participantDate).getFullYear();

      if (!this.age_stats[age]) {
        this.age_stats[age] = 1;
      } else {
        this.age_stats[age]
          = this.age_stats[age] + 1;
      }
      const grade = participant.grade;
      if (!this.grade_stats[grade]) {
        this.grade_stats[grade] = 1;
      } else {
        this.grade_stats[grade] = this.grade_stats[grade] + 1;
      }
      const school = participant.person.school.name;
      if (!this.school_stats[school]) {
        this.school_stats[school] = 1;
      } else {
        this.school_stats[school]
          = this.school_stats[school] + 1;
      }

      const location = participant.person.location.city;
      if (!this.location_stats[location]) {
        this.location_stats[location] = 1;
      } else {
        this.location_stats[location]
          = this.location_stats[location] + 1;
      }
    });

  }
  //

  /*STATISTIC METHODS*/

  private initalize_gender_numbers(): void {

    this.stat_num_gender_f = 0;
    this.stat_num_gender_m = 0;
    this.stat_num_gender_d = 0;
    this.stat_num_role_s = 0;
    this.stat_num_role_d = 0;
    this.stat_num_role_sd = 0;

    this.participants.forEach(participant => {
      if (participant.role === ParticipantRole.DOZENT) {
        this.stat_num_role_d++;
      }
      if (participant.role === ParticipantRole.SCHUELER) {
        this.stat_num_role_s++;
      }
      if (participant.role === ParticipantRole.SCHUELERDOZENT) {
        this.stat_num_role_sd++;
      }

      if (participant.person.gender === PersonGender.FEMALE) {
        this.stat_num_gender_f++;
      }
      if (participant.person.gender === PersonGender.MALE) {
        this.stat_num_gender_m++;
      }
      if (participant.person.gender === PersonGender.DIVERSE) {
        this.stat_num_gender_d++;
      }
    });
  }
  /****************************************************************** */






  constructor(private currentEventService: CurrentEventService, private ipc: IpcRendererService) {

    this.currentEventService.currentEventChanged.subscribe((newEvent: Event) => {
      this.setEvent(newEvent);
    });
    this.setEvent(this.currentEventService.getEvent());

  }

  ngOnInit() {

    /***   Initialize Basic Chart Parameters, that never Change  ***/

    this.genderChartType = 'pie';
    this.roleChartType = 'pie';
    this.ageChartType = 'bar';
    this.gradeChartType = 'bar';
    this.locationChartType = 'horizontalBar';
    this.schoolChartType = 'horizontalBar';


    this.genderChartLabels = [I18n.resolve('dashboard_female'), I18n.resolve('dashboard_male'), I18n.resolve('dashboard_divers')];
    this.roleChartLabels = [
      I18n.resolve('dashboard_student'),
      I18n.resolve('dashboard_teacher'),
      I18n.resolve('dashboard_student_teacher')];
    /************************************************************* */


  }



  /**
   * NbCalendarRangeComponent not support to reject change...
   * so we need to hack.. ngIf removes dom element on false, so
   * we remove element and add it after 1ms
   */
  rejectRangeChange(): void {
    this.refreshCalenderRange = false;
    setTimeout(() => this.refreshCalenderRange = true, 1);
  }
  setEvent(ev: Event): void {
    if (ev !== null && ev.id != null) {
      this.loading = true;
      this.currentEvent = ev;

      this.rangeObject = {
        start: new Date(this.currentEvent.startsDate),
        end: new Date(this.currentEvent.endsDate)
      };
      /******* Nested Get IPC Renderer Methods, so that ShowHelp won't be false before every Chart is initialized ******* */
      this.ipc.get('get/event/participants', { id: this.currentEvent.id }).
        then((result: Participant[]) => {
          this.participants = result;
          this.stat_num_participants = result.length;
          this.initalize_gender_numbers();
          this.initialize_Age();
          this.agearr = [];
          this.gradearr = [];
          this.locationarr = [];
          this.schoolarr = [];

          this.genderChartData = [this.stat_num_gender_f, this.stat_num_gender_m, this.stat_num_gender_d];
          this.roleChartData = [this.stat_num_role_s, this.stat_num_role_d, this.stat_num_role_sd];
          for (const year of Object.keys(this.age_stats)) {
            this.agearr.push(this.age_stats[year]);
          }

          this.ageChartLabels = Object.keys(this.age_stats);
          this.ageChartLegend = true;
          this.ageChartData = [{
            data: this.agearr, label: I18n.resolve('dashboard_age'),
          },

          ];
          for (const school of Object.keys(this.school_stats)) {
            this.schoolarr.push(this.school_stats[school]);
          }

          this.schoolChartLabels = Object.keys(this.school_stats);
          this.schoolChartLegend = true;
          this.schoolChartData = [{
            data: this.schoolarr, label: I18n.resolve('dashboard_school'),
          },

          ];
          for (const location of Object.keys(this.location_stats)) {
            this.locationarr.push(this.location_stats[location]);
          }

          this.locationChartLabels = Object.keys(this.location_stats);
          this.locationChartLegend = true;
          this.locationChartData = [{
            data: this.locationarr, label: I18n.resolve('dashboard_location'),
          },

          ];

          for (const grade of Object.keys(this.grade_stats)) {
            this.gradearr.push(this.grade_stats[grade]);
          }

          this.gradeChartLabels = Object.keys(this.grade_stats);
          const check = this.gradeChartLabels.indexOf('null');
          if (!(check === -1)) {
            this.gradeChartLabels[check] = I18n.resolve('dashboard_no_grade');
          }
          this.gradeChartLegend = true;
          this.gradeChartData = [{
            data: this.gradearr, label: I18n.resolve('dashboard_grade'),
          },
          ];

          this.ipc.get('get/event/groups', { id: this.currentEvent.id }).
            then((resultA: Group[]) => {
              this.groups = resultA;
              this.stat_num_groups = this.groups.length;
              this.ipc.get('get/event/bedrooms', { id: this.currentEvent.id }).
                then((resultB: Bedroom[]) => {
                  this.bedrooms = resultB;
                  this.stat_num_bedrooms = this.bedrooms.length;
                  this.ipc.get('get/event/classrooms', { id: this.currentEvent.id }).
                    then((resultC: Classroom[]) => {
                      this.classrooms = resultC;
                      this.stat_num_classrooms = this.classrooms.length;
                      this.showHelp = false;
                      this.loading = false;
                    });
                });
            });


        });
      /**************************** */
    } else {
      this.showHelp = true;

    }
  }


}




