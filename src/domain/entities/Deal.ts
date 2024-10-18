export class Deal {
  constructor(
    public title: string,
    public description: string,
    public discount: number,
    public isActive: boolean = true
  ) {}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Set the deal status to inactive.
 */
/******  3648f666-adc9-4823-8a9f-4b15cc3f2a77  *******/
  discontinue() {
    this.isActive = false;
  }

  updateDetails(title: string, description: string, discount: number) {
    this.title = title;
    this.description = description;
    this.discount = discount;
  }
}
