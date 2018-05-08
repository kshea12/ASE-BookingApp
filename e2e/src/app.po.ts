import { browser, by, element } from 'protractor';

export class BookingAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ba-root h1')).getText();
  }
}
