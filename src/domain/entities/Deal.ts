export class Deal {
  constructor(
    public title: string,
    public description: string,
    public discount: number,
    public isActive: boolean = true
  ) {}

  discontinue() {
    this.isActive = false;
  }

  updateDetails(title: string, description: string, discount: number) {
    this.title = title;
    this.description = description;
    this.discount = discount;
  }
}
