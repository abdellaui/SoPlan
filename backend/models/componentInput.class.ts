export interface EntitySelectOption {
  id: number;
  name: string;
  title: string;
}

export interface EntitySelectSettings {
  getUrl: string;
  listNameMembers: any[];
  getParams?: Object;
  listTitleMembers?: any[];
  header?: string;
  maxSelection?: number;
  seperatorName?: string;
  seperatorTitle?: string;
}

export interface FormBuilderSettings {
  header?: string;
  buttons?: boolean;
  paddings?: { left: string, right: string };
}
