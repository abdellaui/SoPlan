import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfConfig, PugToPdfConfig } from '@models/configs.class';
import { NbStepperComponent } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';

import { IpcRendererService } from '../../../services/ipc-renderer/ipc-renderer.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})

export class CertificateComponent implements OnInit {

  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  stepThreeForm: FormGroup;
  stepper: NbStepperComponent;

  private myPugConf: PugToPdfConfig = new PugToPdfConfig();

  constructor(private fb: FormBuilder, private toastrServ: ToastrService,
    private ipc: IpcRendererService) {
  }

  ngOnInit() {
    this.stepOneForm = this.fb.group({
      artBescheinigung: ['', Validators.required],
      nameVeranstaltung: ['', Validators.required],
      datumVeranstaltung: ['', Validators.required],
      kurzerNameVeranstaltung: ['', Validators.required],
      ortVeranstaltung: ['', Validators.required],
    });

    this.stepTwoForm = this.fb.group({
      namePerson: ['', Validators.required],
      schulePerson: ['', Validators.required],
      classPerson: ['', Validators.required],
    });

    this.stepThreeForm = this.fb.group({
      pdfFile: ['', Validators.required],
      pugFile: ['', Validators.required],
      htmlFile: ['', Validators.required],
    });

    this.stepOneForm.get('nameVeranstaltung').setValue('Mathematischen Winterakademie');
    this.stepOneForm.get('kurzerNameVeranstaltung').setValue('Winterakademie');
    this.stepOneForm.get('datumVeranstaltung').setValue('07. bis 09. Dezember 2018');
    this.stepOneForm.get('ortVeranstaltung').setValue('Wegberg');

    this.stepThreeForm.get('pdfFile').setValue('D:/Studienprojekt/generated/student.pdf');
    this.stepThreeForm.get('pugFile').setValue('D:/Studienprojekt/generated/certificateStudent.pug');
    this.stepThreeForm.get('htmlFile').setValue('D:/Studienprojekt/generated/student.html');
  }

  onFirstClicked(stepper: any) {
    if ('VALID' === this.stepOneForm.get('nameVeranstaltung').status
      && 'VALID' === this.stepOneForm.get('kurzerNameVeranstaltung').status
      && 'VALID' === this.stepOneForm.get('datumVeranstaltung').status
      && 'VALID' === this.stepOneForm.get('artBescheinigung').status
      && 'VALID' === this.stepOneForm.get('ortVeranstaltung').status) {
      this.stepOneForm.markAsDirty();
      this.toastrServ.clear();
      stepper.next();
    } else {
      this.toastrServ.error('Bitte alle Felder ausfüllen.');
    }
  }

  onSecondClicked(stepper: any) {
    if ('VALID' === this.stepTwoForm.get('namePerson').status
      && 'VALID' === this.stepTwoForm.get('schulePerson').status
      && 'VALID' === this.stepTwoForm.get('classPerson').status) {
      this.stepTwoForm.markAsDirty();
      this.toastrServ.clear();
      stepper.next();
    } else {
      this.toastrServ.error('Bitte alle Felder ausfüllen.');
    }
  }

  onThirdSubmit() {
    if ('VALID' === this.stepThreeForm.get('pdfFile').status
      && 'VALID' === this.stepThreeForm.get('pugFile').status
      && 'VALID' === this.stepThreeForm.get('htmlFile').status) {
      this.stepThreeForm.markAsDirty();
      this.toastrServ.clear();
      this.toastrServ.info('Bitte warten.');
      this.pugToPDF('a', 'b');
    } else {
      this.toastrServ.clear();
      this.toastrServ.error('Bitte alle Felder ausfüllen.');
    }
  }

  pugToPDF(fileIn, filePathOut: any) {
    this.myPugConf.filepathPug = this.stepThreeForm.get('pugFile').value;
    this.myPugConf.filepathGeneratedHtml = this.stepThreeForm.get('htmlFile').value;
    this.myPugConf.filepathGeneratedPdf = this.stepThreeForm.get('pdfFile').value;
    this.myPugConf.pugConf = {
      vorname: 'Marc',
      nachname: 'Müller',
      jahrgangsstufe: '10',
      schulname: 'A-Schule',
      schulort: 'B-Stadt',
      veranstaltungsnamelangversion: this.stepOneForm.get('nameVeranstaltung').value,
      veranstaltungsnamekurzversion: this.stepOneForm.get('kurzerNameVeranstaltung').value,
      zeitraum: this.stepOneForm.get('datumVeranstaltung').value,
      austragungsort: this.stepOneForm.get('ortVeranstaltung').value,
    };
    this.myPugConf.pdfConf = PdfConfig.defaultPdfSettings();

    this.ipc.get<boolean>('convertPugToPdf', this.myPugConf).then(result => {
      if (result) {
        this.toastrServ.clear();
        this.toastrServ.success('Fertig');
      } else {
        this.toastrServ.clear();
        this.toastrServ.error('Fehlgeschlagen');
      }
    });
    console.error('invoked');
  }
}
