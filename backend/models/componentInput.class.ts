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
  createButtonText?: string;
  showCreateButton?: boolean;
  editorUrl?: string;
}

export interface FormBuilderSettings {
  header?: string;
  buttons?: boolean;
  paddings?: { left: string, right: string };
  buttonText?: string;
  initialWarningsIgnore?: boolean;
}

export interface SmartTableCustomAction {
  name: string;
  icon: string;
  tooltip: string;
}

export interface SmartTableCustomListAction {
  name: string;
  title: string;
}

export interface SmartTableMemberList {
  /**
   * prefix (außer root) sollte mit @ enden. z.B.
   * Object{created: {day: 12, ... }, ... }
   * => created@ und members [day]
   */
  prefix: string;
  schema: any;
  members: string[];
  extendedSettings?: Object;
}

export interface SmartTableConfig {
  settings: {
    header: string,
    createButtonText?: string,
    showCreateButton?: boolean,
  };
  slotUrls: {
    getUrl: string,
    postUrl: string,
    deleteUrl: string,
    editorUrl?: string,
    getParam?: Object
  };
  memberList: SmartTableMemberList[];
  instanceMap: Object;
  customActions?: SmartTableCustomAction[];
  customListAction?: SmartTableCustomListAction[];

}
