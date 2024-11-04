export default class BaseComponent {
  protected rootSelector: string;

  constructor(protected selector: string) {
    this.rootSelector = selector;
  }

  get rootEl() {
    return cy.get(this.rootSelector);
  }
}
