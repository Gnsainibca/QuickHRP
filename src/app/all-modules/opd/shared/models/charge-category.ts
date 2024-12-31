export interface ChargeCategory {
  name: string,
  type: string,
  description: string
}

export interface Charge {
  name: string,
  chargeCategory: string,
  chargeType: string,
  unit: string,
  tax: number,
  price: number
}