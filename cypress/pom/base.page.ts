import SideNav from './components/side-nav.component';
import TopNav from './components/top-nav.component';

export default class BasePage {
  protected url: string;

  constructor(pageUrl: string) {
    this.url = pageUrl;
  }

  openPage() {
    cy.visit(this.url);
  }

  get sideNav() {
    return new SideNav();
  }

  get topNav() {
    return new TopNav();
  }
}
