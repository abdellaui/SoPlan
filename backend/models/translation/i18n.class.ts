import { sprintf } from 'sprintf-js';

import { de } from './de.language';
import { en } from './en.language';

export class I18n {
  static currentLanguage = null;

  static resolve(phrase: string, ...args: any[]): string {

    if (!I18n.currentLanguage) {
      try {
        I18n.setLanguage(localStorage.getItem('lang') || 'de');
      } catch (e) {
        I18n.setLanguage('de');
      }
    }
    return sprintf(I18n.currentLanguage[phrase] || phrase + ' not found', ...args) + '_i18n';

  }

  static setLanguage(lang: string): void {
    switch (lang) {
      case 'de':
        I18n.currentLanguage = de;
        break;
      case 'en':
        I18n.currentLanguage = en; // @FIXME einkommentieren
        break;
      default:
        I18n.currentLanguage = de;
        break;
    }
  }

  // Einbinden des i18n an verschiedenen Stellen:

  // *** inside HTML:
  // In der zugehörigen .ts Datei in der Klasser ergänzen:
  // ... class ... {
  // public _i18n = I18n; // for accessing in html
  // ... }
  // Im HTML code
  // {{ _i18n.resolve('table_edit_advanced') }}

  // *** inside class:
  // I18n.resolve('dashboard_female')
}
