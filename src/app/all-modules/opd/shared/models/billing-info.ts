export interface BillingInfo {
  charge : number;
  paid : number;
  percentage ?: number;
  progressClass ?: string;
}

// export class SimpleBillingInfo{ 
//   public charge : number = 0;
//   public  paid : number = 0;

//   constructor(charge: number, paid: number){
//     this.charge = charge;
//     this.paid = paid;
//   }

//   get percentage(): number { // read-only property with getter function (this is not the same thing as a “function-property”)
//       return (this.charge * 100) / this.paid;
//   }
//   get progressClass(): string { // read-only property with getter function (this is not the same thing as a “function-property”)
//     return this.percentage > 100 ? ' bg-success' : (this.percentage < 50 ? 'bg-danger' : 'bg-info');
// }
// }