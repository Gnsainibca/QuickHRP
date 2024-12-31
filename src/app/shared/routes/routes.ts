

export class routes {

  private static Url = '';


  public static get baseUrl(): string {
    return this.Url;
  }
  public static get login(): string {
    return this.baseUrl + '/login';
  }
  public static get forgotPassword(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  public static get billing(): string {
    return this.baseUrl + '/billing';
  }
  public static get appointment(): string {
    return this.baseUrl + '/appointment';
  }
  public static get opd(): string {
    return this.baseUrl + '/opd';
  }
  public static get ipd(): string {
    return this.baseUrl + '/ipd';
  }
  public static get ipdDischargedPatient(): string {
    return this.baseUrl + '/ipd/discharged-patient';
  }
  public static get pharmacy(): string {
    return this.baseUrl + '/pharmacy';
  }
  public static get pharmacyMedicine(): string {
    return this.baseUrl + '/pharmacy/medicine';
  }
  public static get purchaseMedicine(): string {
    return this.baseUrl + '/pharmacy/medicine/purchase';
  }
  public static get frontOffice(): string {
    return this.baseUrl + '/front-office';
  }
  public static get visitor(): string {
    return this.baseUrl + '/front-office/visitor';
  }
  public static get phoneCallLog(): string {
    return this.baseUrl + '/front-office/phone-call-log';
  }
  public static get postal(): string {
    return this.baseUrl + '/front-office/postal';
  }
  public static get complain(): string {
    return this.baseUrl + '/front-office/complain';
  }
  public static get activities(): string {
    return this.baseUrl + '/activities';
  }
  public static get generalSettings(): string {
    return this.baseUrl + '/settings/general-settings';
  }
  public static get profile(): string {
    return this.baseUrl + '/profile';
  }
  public static get pathology(): string {
    return this.baseUrl + '/pathology';
  }
  public static get pathologyTest(): string {
    return this.baseUrl + '/pathology/test';
  }
  public static get radiology(): string {
    return this.baseUrl + '/radiology';
  }
  public static get radiologyTest(): string {
    return this.baseUrl + '/radiology/test';
  }
  public static get staff(): string {
    return this.baseUrl + '/staff';
  }
  public static get patient(): string {
    return this.baseUrl + '/patient';
  }
  public static get billingAppointment(): string {
    return this.baseUrl + '/billing/appointment';
  }
  public static get billingOpd(): string {
    return this.baseUrl + '/billing/opd';
  }
  public static get billingIpd(): string {
    return this.baseUrl + '/billing/ipd';
  }
  public static get billingPathology(): string {
    return this.baseUrl + '/billing/pathology';
  }
  public static get billingRadiology(): string {
    return this.baseUrl + '/billing/radiology';
  }
  public static get setup(): string {
    return this.baseUrl + '/setup';
  }
  public static get settings(): string {
    return this.baseUrl + '/setup/settings';
  }
  public static get charges(): string {
    return this.baseUrl + '/setup/charges';
  }
  public static get bed(): string {
    return this.baseUrl + '/setup/bed';
  }
  public static get frontOfficeSetup(): string {
    return this.baseUrl + '/setup/front-office';
  }
  public static get OperationSetup(): string {
    return this.baseUrl + '/setup/operation';
  }
  public static get PharmacySetup(): string {
    return this.baseUrl + '/setup/pharmacy';
  }
  public static get PathologySetup(): string {
    return this.baseUrl + '/setup/pathology-setting';
  }
  public static get RadiologySetup(): string {
    return this.baseUrl + '/setup/radiology-setting';
  }
  public static get SymptomsSetup(): string {
    return this.baseUrl + '/setup/symptoms';
  }
  public static get FindingsSetup(): string {
    return this.baseUrl + '/setup/findings';
  }
  public static get VitalSetup(): string {
    return this.baseUrl + '/setup/vital';
  }
  public static get HumanResourceSetup(): string {
    return this.baseUrl + '/setup/human-resource';
  }
  public static get AppointmentSetup(): string {
    return this.baseUrl + '/setup/appointment-setting';
  }
}