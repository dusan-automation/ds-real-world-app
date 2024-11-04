import BaseComponent from './base.component';

export default class TopNav extends BaseComponent {
  private newTransactionButtonLocator = '[data-test="nav-top-new-transaction"]';
  private notificationButtonLocator = '[data-test="nav-top-notifications-link"]';
  private everyoneTabLocator = '[data-test="nav-public-tab"]';
  private friendsTabLocator = '[data-test="nav-contacts-tab"]';
  private mineTabLocator = '[data-test="nav-personal-tab"]';

  constructor() {
    super('header');
  }

  get newTransactionButton() {
    return this.rootEl.find(this.newTransactionButtonLocator);
  }

  get notificationButton() {
    return this.rootEl.find(this.notificationButtonLocator);
  }

  get everyoneTab() {
    return this.rootEl.find(this.everyoneTabLocator);
  }

  get friendsTab() {
    return this.rootEl.find(this.friendsTabLocator);
  }

  get mineTab() {
    return this.rootEl.find(this.mineTabLocator);
  }
}
