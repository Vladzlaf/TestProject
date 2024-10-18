export class Deal {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public discount: number,
    public merchantId: string,
    public isActive: boolean = true
  ) {}
}