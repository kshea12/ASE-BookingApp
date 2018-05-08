import { BookingAppPage } from './app.po';

describe('Booking App', () => {
  let page: BookingAppPage;

  beforeEach(() => {
    page = new BookingAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('BOOKING APP');
  });
});
