export class Option {
  label: string;
  value: any;

  /**
   * Erzeugt eine Option für eine Auswahllisten
   * @param label zeigt den Namen des Options an
   * @param value enthält den wirklichen Wert
   */
  constructor(label: string, value?: any) {
    this.label = label;
    this.value = (value) ? value : this.label;
  }
}

export class Element {

  private readonly: boolean;
  private elementType: ElementTypes;

  /**
   * Erzeugt einen Form-Element jeglicher Art
   * @param element gibt den Element-Type an
   * @param readonly gibt an ob Element manipulierbar ist
   */
  constructor(element: ElementTypes, readonly?: boolean) {
    this.elementType = element;

    this.readonly = (readonly) ? readonly : false;

  }

  isReadOnly(): boolean {
    return this.readonly;
  }

  getElementType(): ElementTypes {
    return this.elementType;
  }

}

export enum ElementTypes {
  Input = 1,
  CheckBox = 2,
  RadioButton = 4,
  TextArea = 8,
  DatePicker = 16,
  SelectBox = 32
}




export class Input extends Element {
  private type: string;
  private placeholder: string;

  /**
   * Erzeugt einen Inputfeld vom jeweiligen Typ. Default-Typ ist text
   * @param type gibt an welches Type das Input haben soll. z.B. text|password|number
   * @param readonly gibt an ob Wert manipulierbar ist
   * @param placeholder Platzhalter
   */
  constructor(type?: string, readonly?: boolean, placeholder?: string) {
    super(ElementTypes.Input, readonly);
    this.type = (type) ? type : 'text';
    this.placeholder = (placeholder) ? placeholder : '';

  }

  getType(): string {
    return this.type;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }
}


export class TextArea extends Element {
  private placeholder: string;
  /**
   * Erzeugt ein Textarea
   * @param readonly gibt an ob Wert manipulierbar ist
   * @param placeholder Platzhalter
   */
  constructor(readonly?: boolean, placeholder?: string) {
    super(ElementTypes.TextArea, readonly);
    this.placeholder = (placeholder) ? placeholder : '';
  }
  getPlaceholder(): string {
    return this.placeholder;
  }
}
export class DatePicker extends Element {
  private dateFormat: string;
  private placeholder: string;

  /**
   * Erzeugt einn DatePicker
   * @param dateFormat Default DD.MM.YYYY
   * @param readonly gibt an ob Wert manipulierbar ist
   * @param placeholder Platzhalter
   */
  constructor(dateFormat?: string, readonly?: boolean, placeholder?: string) {
    super(ElementTypes.DatePicker, readonly);
    this.dateFormat = (dateFormat) ? dateFormat : 'DD.MM.YYYY';
    this.placeholder = (placeholder) ? placeholder : '';
  }

  getDateFormat(): string {
    return this.dateFormat;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }
}


export class CheckBox extends Element {
  /**
   * @param readonly gibt an ob Wert manipulierbar ist
   */
  constructor(readonly?: boolean) {
    super(ElementTypes.CheckBox, readonly);
  }

}

export class SelectBox extends Element {
  private options: Option[];
  private placeholder: string;
  /**
   * Erzeugt eine aufklapbare Auswahlliste
   * @param options Erwartet einen Option[] für die Auswahlliste
   * @param readonly gibt an ob Wert manipulierbar ist
   * @param placeholder Platzhalter
   */
  constructor(options: Option[], readonly?: boolean, placeholder?: string) {
    super(ElementTypes.SelectBox, readonly);
    this.options = options;
    this.placeholder = (placeholder) ? placeholder : 'Bitte Wählen!';
  }

  getOptions(): Option[] {
    return this.options;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }
}

export class RadioButton extends Element {
  private options: Option[];

  /**
   * Erzeugt eine selektierbare Auswahlliste
   * @param options Erwartet einen Option[] für die Auswahlliste
   * @param readonly gibt an ob Wert manipulierbar ist
   */
  constructor(options: Option[], readonly?: boolean) {
    super(ElementTypes.RadioButton, readonly);
    this.options = options;
  }

  getOptions(): Option[] {
    return this.options;
  }
}

export interface FormElement {
  name: string;
  member: string;
  element: Input | TextArea | DatePicker | CheckBox | SelectBox | RadioButton;
}
