import { sprintf } from 'sprintf-js';

import { de } from './de.language';
import { en } from './en.language';

export class I18n {
  static currentLanguage = de;

  static resolve(phrase: string, ...args: any[]): string {

    return sprintf(I18n.currentLanguage[phrase] || phrase + ' not found', ...args);
  }

  static setLanguage(lang: string): void {
    switch (lang) {
      case 'de':
        I18n.currentLanguage = de;
        break;
      case 'en':
        I18n.currentLanguage = en;
        break;
      default:
        I18n.currentLanguage = de;
        break;
    }
  }

}