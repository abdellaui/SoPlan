import { sprintf } from 'sprintf-js';

import { lang as currentLanguage } from './de.language';

export class I18n {


  static resolve(phrase: string, ...args: any[]): string {

    return sprintf(currentLanguage[phrase], ...args) || phrase + ' not found';
  }


}
