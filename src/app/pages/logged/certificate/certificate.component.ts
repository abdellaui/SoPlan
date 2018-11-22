import { ViewChild, OnInit, ElementRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NbStepperComponent } from '@nebular/theme';

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

  constructor(private fb: FormBuilder, private toastrServ: ToastrService) {
  }

  ngOnInit() {
    this.stepOneForm = this.fb.group({
      nameVeranstaltung: ['', Validators.required],
      datumVeranstaltung: ['', Validators.required],
      artBescheinigung: ['', Validators.required],
    });

    this.stepTwoForm = this.fb.group({
      namePerson: ['', Validators.required],
      schulePerson: ['', Validators.required],
      classPerson: ['', Validators.required],
    });

    this.stepThreeForm = this.fb.group({
      filePath: ['', Validators.required],
      urlSite: ['', Validators.required],
    });
  }

  onFirstClicked(stepper) {
    if ( 'VALID' === this.stepOneForm.get('nameVeranstaltung').status
      && 'VALID' === this.stepOneForm.get('datumVeranstaltung').status
      && 'VALID' === this.stepOneForm.get('artBescheinigung').status) {
        this.stepOneForm.markAsDirty();
        this.toastrServ.clear();
        stepper.next();
    } else {
      this.toastrServ.error('Bitte alle Felder ausfüllen.');
    }
  }

  onSecondClicked(stepper) {
    if ( 'VALID' === this.stepTwoForm.get('namePerson').status
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
    if ( 'VALID' === this.stepThreeForm.get('filePath').status
      && 'VALID' === this.stepThreeForm.get('urlSite').status) {
        this.stepThreeForm.markAsDirty();
        this.toastrServ.clear();

        this.generatePDFfromURL(this.stepThreeForm.get('urlSite').value,
          this.stepThreeForm.get('filePath').value);
    } else {
      this.toastrServ.error('Bitte alle Felder ausfüllen.');
    }
  }

  /**
   * Lädt Website im neuen Fenster
   * @param urlToLoad Website die geladen werden soll
   * @param showWindow Soll das Fenster angezeigt werden
   * @returns BrowserWindow: Fenster
   */
  createUrlBrowserWindow(urlToLoad, showWindow) {
    const electron = require('electron');
    const broswerWindow = new electron.remote.BrowserWindow({ width: 800, height: 1500, show : showWindow });
    broswerWindow.loadURL(urlToLoad);
    return broswerWindow;
  }

  /**
   * Lädt HtmlFile im neuen Fenster
   * @param fileToLoad Datei die geladen werden soll
   * @param showWindow Soll das Fenster angezeigt werden
   * @returns BrowserWindow: Fenster
   */
  createFileBrowserWindow(fileToLoad, showWindow) {
    const electron = require('electron');
    const broswerWindow = new electron.remote.BrowserWindow({ width: 800, height: 1500, show : showWindow  });
    broswerWindow.loadFile(fileToLoad);
    return broswerWindow;
  }

  /**
   * Generiert eine PDF Datei aus der angegebenen Website
   * @param urlSource URL der zu druckenden Seite
   * @param filePath Pfad zum speichern e.g. "C:/name.pdf"
   */
  generatePDFfromURL(urlSource, filePath) {
    function pdfSettings() {
      const avaiblePaperSizes = ['A5', 'A4', 'A3', 'Legal', 'Letter', 'Tabloid'];
      const option = {
          marginsType: 0,
          pageSize: avaiblePaperSizes[1],
          printBackground: false,
          printSelectionOnly: false,
          landscape: false,
      };
      return option;
    }
    return this.generatePDF(this.createUrlBrowserWindow(urlSource, false), filePath, pdfSettings());
  }

  /**
   * Druckt ein BrowserWindow aus.
   * @param windowToPdf BrowserWindow welches ausgedruckt werden soll
   * @param filePath Speicherort (erstmal so...)
   */
  generatePDF(pdfWindow, filePath, pdfSettings) {
    const fs = require('fs');

    pdfWindow.once('ready-to-show', () => {
      pdfWindow.show();
      // PDF erzeugen
      pdfWindow.webContents.printToPDF(pdfSettings, function(err, data) {
        if (err) {
            console.error('Failed to generate file.');
            return;
        }
        try {
            fs.writeFileSync(filePath, data);
        } catch (err) {
            console.error('Failed to write file.');
            return;
        }
      });
    });
  }
}
