import { AngularNgrxMaterialStarterPage } from './app.po';

describe('Booking App', () => {
  let page: AngularNgrxMaterialStarterPage;

  beforeEach(() => {
    page = new AngularNgrxMaterialStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('BOOKING APP');
  });
});
