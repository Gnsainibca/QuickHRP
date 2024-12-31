export interface pageSelection {
  skip: number;
  limit: number;
}
export interface apiResultFormat {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
data: Array<any>;
totalData: number;
}

export interface routerlink {
url: string;
// id: number;
// type: number;
}
export interface sideBar {
  tittle: string,
  showAsTab: boolean,
  separateRoute: boolean,
  menu: menu[]
}
export interface menu { 
  menuValue: string,
  route ?: string,
  hasSubRoute: boolean,
  showSubRoute: boolean,
  icon: string,
  base?: Array<string>,
  subMenus: submenu[]
}
export interface submenu { 
  menuValue?: string,
  route: string,
  base?: Array<string>,
  icon: string,
}