export class ItemCart {

  constructor(
    public id?: string,
    public infoID?:string,
    public name?: string,
    public colorCode?: string,
    public image?: string,
    public price?: string,
    public number?: number,
    public discountCode?: number,
    public discountPercent?: number,
    public sendCost?:number

  ) {
  }

}
