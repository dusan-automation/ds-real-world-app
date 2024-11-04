import BaseComponent from './base.component';

export default class SideNav extends BaseComponent {
  private userFullNameLocator = '[data-test="sidenav-user-full-name"]';
  private usernameLocator = '[data-test="sidenav-username"]';
  private userBalanceLocator = '[data-test="sidenav-user-balance"]';
  private homeLinkLocator = '[data-test="sidenav-home"]';
  private myAccountLinkLocator = '[data-test="sidenav-user-settings"]';
  private bankAccountsLinkLocator = '[data-test="sidenav-bankaccounts"]';
  private notificationsLinkLocator = '[data-test="sidenav-notifications"]';
  private logoutLinkLocator = '[data-test="sidenav-signout"]';

  constructor() {
    super('[data-test="sidenav"]');
  }

  get userFullName() {
    return this.rootEl.find(this.userFullNameLocator);
  }

  get username() {
    return this.rootEl.find(this.usernameLocator);
  }

  get userBalance() {
    return this.rootEl.find(this.userBalanceLocator);
  }

  get homeLink() {
    return this.rootEl.find(this.homeLinkLocator);
  }

  get myAccountLink() {
    return this.rootEl.find(this.myAccountLinkLocator);
  }

  get bankAccountsLink() {
    return this.rootEl.find(this.bankAccountsLinkLocator);
  }

  get notificationsLink() {
    return this.rootEl.find(this.notificationsLinkLocator);
  }

  get logoutLink() {
    return this.rootEl.find(this.logoutLinkLocator);
  }
}
